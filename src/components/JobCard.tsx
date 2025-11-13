import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Calendar, ExternalLink, Wallet, Clock } from "lucide-react";
import { Job, getJobStatus } from "@/hooks/useJobs";
import { format } from "date-fns";

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const status = getJobStatus(job.application_deadline);
  const deadline = new Date(job.application_deadline);
  const isExpired = deadline < new Date();

  const getProgramColor = (programType: string) => {
    switch (programType) {
      case 'Co-op': return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
      case 'Remote@AUI': return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      case 'Alternance': return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800';
    }
  };

  const getModalityIcon = (modality: string | null) => {
    switch (modality) {
      case 'remote': return '🏠';
      case 'hybrid': return '🔄';
      case 'onsite': return '🏢';
      default: return '';
    }
  };

  return (
    <Card className={`h-full flex flex-col transition-all duration-300 hover:shadow-lg ${isExpired ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-start gap-4">
          {job.company_logo_url && (
            <div className="flex-shrink-0">
              <img 
                src={job.company_logo_url} 
                alt={`${job.company_name} logo`}
                className="w-20 h-20 object-contain rounded-lg bg-background border-2 shadow-sm"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0 h-20 flex flex-col justify-between">
            <div className="flex items-center justify-end gap-2">
              <Badge className={`text-xs ${getProgramColor(job.program_type)}`}>
                {job.program_type}
              </Badge>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <CardTitle className="text-xl font-bold line-clamp-2 leading-tight mb-1">
                {job.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 flex-shrink-0 text-foreground" />
                <span className="text-base font-medium text-foreground truncate">{job.company_name}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4 space-y-3 flex-1 flex flex-col">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="flex items-center gap-2">
              Apply by: {format(deadline, 'MMM dd, yyyy')}
              {isExpired && <Clock className="w-4 h-4 text-destructive" />}
            </span>
          </div>

          {job.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {job.location} {job.modality && `${getModalityIcon(job.modality)} ${job.modality}`}
              </span>
            </div>
          )}

          {job.compensation_range && (
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 flex-shrink-0" />
              <span>{job.compensation_range}</span>
            </div>
          )}
        </div>

        {job.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        )}

        {job.tags && job.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {job.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                {tag}
              </Badge>
            ))}
            {job.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{job.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 mt-auto flex-shrink-0">
        <Button 
          className="w-full" 
          variant={isExpired ? "outline" : "default"}
          disabled={isExpired}
          onClick={() => window.open(job.apply_now_link, '_blank', 'noopener,noreferrer')}
        >
          {isExpired ? (
            <>
              <Clock className="w-4 h-4 mr-2" />
              Application Closed
            </>
          ) : (
            <>
              <ExternalLink className="w-4 h-4 mr-2" />
              Apply Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};