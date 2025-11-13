import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Presentation, File } from "lucide-react";

const FILE_TYPE_OPTIONS = [
  { value: "pdf", label: "PDF" },
  { value: "doc", label: "DOC" },
  { value: "docx", label: "DOCX" },
  { value: "ppt", label: "PPT" },
  { value: "pptx", label: "PPTX" },
  { value: "xls", label: "XLS" },
  { value: "xlsx", label: "XLSX" }
];

const CATEGORY_OPTIONS = [
  { value: "presentations", label: "Presentations" },
  { value: "student_guides", label: "Student Guides" },
  { value: "employer_guides", label: "Employer Guides" },
  { value: "cv_interview_guides", label: "CV & Interview Guides" }
];

const AdminResources = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Database["public"]["Enums"]["resource_category_enum"] | "">("");
  const [fileType, setFileType] = useState<Database["public"]["Enums"]["file_type_enum"] | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      category: Database["public"]["Enums"]["resource_category_enum"];
      file_type: Database["public"]["Enums"]["file_type_enum"];
      file: File;
    }) => {
      setUploading(true);
      
      // Upload file to Supabase storage
      const fileExt = data.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resources')
        .upload(fileName, data.file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('resources')
        .getPublicUrl(fileName);

      // Insert resource record
      const { data: resourceData, error: insertError } = await supabase
        .from('resources')
        .insert({
          title: data.title,
          description: data.description,
          category: data.category,
          file_type: data.file_type,
          file_url: urlData.publicUrl,
          file_name: data.file.name
        })
        .select()
        .single();

      if (insertError) throw insertError;
      
      return resourceData;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Resource uploaded successfully!"
      });
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setFileType("");
      setFile(null);
      // Refresh resources list
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      setUploading(false);
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload resource. Please try again.",
        variant: "destructive"
      });
      setUploading(false);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !fileType || !file) {
      toast({
        title: "Error", 
        description: "Please fill in all required fields and select a file.",
        variant: "destructive"
      });
      return;
    }

    uploadMutation.mutate({
      title,
      description: description || "",
      category,
      file_type: fileType,
      file
    });
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'ppt':
      case 'pptx':
        return <Presentation className="h-6 w-6 text-orange-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-6 w-6 text-blue-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Resource
            </CardTitle>
            <CardDescription>
              Add a new document, presentation, or guide for students and employers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter resource title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter resource description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={(value) => setCategory(value as Database["public"]["Enums"]["resource_category_enum"])} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="file-type">File Type *</Label>
                  <Select value={fileType} onValueChange={(value) => setFileType(value as Database["public"]["Enums"]["file_type_enum"])} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select file type" />
                    </SelectTrigger>
                    <SelectContent>
                      {FILE_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            {getFileIcon(option.value)}
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File *</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    className="sr-only"
                    required
                  />
                  <label 
                    htmlFor="file" 
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm">
                      <span className="font-medium text-primary">Click to upload</span>
                      <span className="text-muted-foreground"> or drag and drop</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Supports: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                    </div>
                  </label>
                </div>
                {file && (
                  <div className="mt-2 p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.name.split('.').pop() || '')}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Resource"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminResources;