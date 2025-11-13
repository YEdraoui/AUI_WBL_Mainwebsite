// News and Events page with full-page article modals
import { useState } from "react";
import { Calendar, Clock, User, Image as ImageIcon, ChevronDown, Search, Filter, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EventCalendar from "@/components/EventCalendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNewsArticles } from "@/hooks/useNewsArticles";

const NewsAndEvents = () => {
  const [selectedTab, setSelectedTab] = useState("articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const { data: articles = [], isLoading } = useNewsArticles();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'event': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'announcement': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  // Filter and sort articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (article.author_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
      case 'oldest':
        return new Date(a.published_at).getTime() - new Date(b.published_at).getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const featuredArticles = sortedArticles.filter(article => article.is_featured);
  const regularArticles = sortedArticles.filter(article => !article.is_featured);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
                News & <span className="text-primary">Events</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Stay updated with the latest news, announcements, and events from our career development programs.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="articles">Latest News</TabsTrigger>
                <TabsTrigger value="calendar">Event Calendar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles" className="space-y-8">
                {/* Search and Filter Controls */}
                <div className="bg-muted/20 rounded-lg p-6 mb-8">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search articles..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full sm:w-48">
                          <Filter className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="news">News</SelectItem>
                          <SelectItem value="event">Events</SelectItem>
                          <SelectItem value="announcement">Announcements</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-48">
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="title">By Title</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {sortedArticles.length} article{sortedArticles.length !== 1 ? 's' : ''} found
                    </div>
                  </div>
                </div>

                {/* Featured Articles */}
                {featuredArticles.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-serif font-bold mb-8 text-center">Featured Stories</h2>
                    <div className="grid gap-8 lg:grid-cols-2">
                      {featuredArticles.slice(0, 2).map((article) => (
                        <Dialog key={article.id}>
                          <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in">
                            {article.featured_image_url && (
                              <div className="aspect-[16/10] overflow-hidden">
                                <img
                                  src={article.featured_image_url}
                                  alt={article.title}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                              </div>
                            )}
                            <CardHeader className="pb-4">
                              <div className="flex items-center justify-between mb-3">
                                <Badge className={getCategoryColor(article.category)} variant="secondary">
                                  {article.category}
                                </Badge>
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                                  Featured
                                </Badge>
                              </div>
                              <CardTitle className="text-2xl font-serif leading-tight hover:text-primary transition-colors">
                                {article.title}
                              </CardTitle>
                              <CardDescription className="text-lg leading-relaxed mt-3">
                                {article.summary}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  {article.author_name && (
                                    <span className="flex items-center">
                                      <User className="h-4 w-4 mr-1" />
                                      {article.author_name}
                                    </span>
                                  )}
                                  <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {format(new Date(article.published_at), "MMM d, yyyy")}
                                  </span>
                                </div>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    className="hover-scale"
                                  >
                                    <ChevronDown className="h-4 w-4 mr-2" />
                                    Read Full Story
                                  </Button>
                                </DialogTrigger>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <div className="flex items-center gap-3 mb-4">
                                <Badge className={getCategoryColor(article.category)} variant="secondary">
                                  {article.category}
                                </Badge>
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                                  Featured
                                </Badge>
                              </div>
                              <DialogTitle className="text-3xl font-serif leading-tight text-left">
                                {article.title}
                              </DialogTitle>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground pt-4">
                                {article.author_name && (
                                  <span className="flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    {article.author_name}
                                  </span>
                                )}
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {format(new Date(article.published_at), "MMM d, yyyy")}
                                </span>
                              </div>
                            </DialogHeader>
                            
                            <div className="mt-6">
                              {article.featured_image_url && (
                                <div className="aspect-[16/9] overflow-hidden rounded-lg mb-8">
                                  <img
                                    src={article.featured_image_url}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              
                              <div className="prose prose-lg max-w-none text-foreground">
                                <p className="text-xl leading-relaxed text-muted-foreground mb-8 font-medium">
                                  {article.summary}
                                </p>
                                
                                <div className="whitespace-pre-wrap leading-relaxed text-lg mb-8">
                                  {article.content}
                                </div>
                                
                                {/* Image Gallery */}
                                {article.additional_images && article.additional_images.length > 0 && (
                                  <div className="mt-12">
                                    <h4 className="text-2xl font-semibold mb-6 text-foreground">Event Gallery</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      {article.additional_images.map((image, index) => (
                                        <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                                          <img
                                            src={image.image_url}
                                            alt={image.caption || "Event image"}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                          />
                                          {image.caption && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                              <p className="text-white text-sm font-medium p-4">
                                                {image.caption}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Articles Grid */}
                {regularArticles.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-serif font-bold mb-8 text-center">Latest Updates</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {regularArticles.map((article, index) => (
                        <Dialog key={article.id}>
                          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in h-full" 
                                style={{ animationDelay: `${index * 100}ms` }}>
                            {article.featured_image_url && (
                              <div className="aspect-video overflow-hidden">
                                <img
                                  src={article.featured_image_url}
                                  alt={article.title}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between mb-2">
                                <Badge className={getCategoryColor(article.category)} variant="secondary">
                                  {article.category}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg leading-tight story-link">
                                {article.title}
                              </CardTitle>
                              <CardDescription className="text-sm leading-relaxed mt-2 line-clamp-3">
                                {article.summary}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0 mt-auto">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                                  {article.author_name && (
                                    <span className="flex items-center">
                                      <User className="h-3 w-3 mr-1" />
                                      {article.author_name}
                                    </span>
                                  )}
                                  <span className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {format(new Date(article.published_at), "MMM d")}
                                  </span>
                                </div>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-xs hover-scale"
                                  >
                                    <ChevronDown className="h-3 w-3 mr-1" />
                                    More
                                  </Button>
                                </DialogTrigger>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <div className="flex items-center gap-3 mb-4">
                                <Badge className={getCategoryColor(article.category)} variant="secondary">
                                  {article.category}
                                </Badge>
                              </div>
                              <DialogTitle className="text-3xl font-serif leading-tight text-left">
                                {article.title}
                              </DialogTitle>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground pt-4">
                                {article.author_name && (
                                  <span className="flex items-center">
                                    <User className="h-4 w-4 mr-2" />
                                    {article.author_name}
                                  </span>
                                )}
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {format(new Date(article.published_at), "MMM d, yyyy")}
                                </span>
                              </div>
                            </DialogHeader>
                            
                            <div className="mt-6">
                              {article.featured_image_url && (
                                <div className="aspect-[16/9] overflow-hidden rounded-lg mb-8">
                                  <img
                                    src={article.featured_image_url}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              
                              <div className="prose prose-lg max-w-none text-foreground">
                                <p className="text-xl leading-relaxed text-muted-foreground mb-8 font-medium">
                                  {article.summary}
                                </p>
                                
                                <div className="whitespace-pre-wrap leading-relaxed text-lg mb-8">
                                  {article.content}
                                </div>
                                
                                {/* Image Gallery */}
                                {article.additional_images && article.additional_images.length > 0 && (
                                  <div className="mt-12">
                                    <h4 className="text-2xl font-semibold mb-6 text-foreground">Event Gallery</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      {article.additional_images.map((image, index) => (
                                        <div key={index} className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                                          <img
                                            src={image.image_url}
                                            alt={image.caption || "Event image"}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                          />
                                          {image.caption && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                              <p className="text-white text-sm font-medium p-4">
                                                {image.caption}
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Empty State */}
                {sortedArticles.length === 0 && !isLoading && (
                  <div className="text-center py-16 animate-fade-in">
                    <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                    <h3 className="text-2xl font-semibold mb-3">
                      {searchQuery || selectedCategory !== "all" ? "No articles found" : "No articles yet"}
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      {searchQuery || selectedCategory !== "all" 
                        ? "Try adjusting your search or filter criteria to find more articles."
                        : "Articles will appear here once they're published."}
                    </p>
                    {(searchQuery || selectedCategory !== "all") && (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("all");
                        }}
                        className="mt-4"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="calendar">
                <div className="bg-gradient-to-br from-background to-muted/20 rounded-lg p-8">
                  <EventCalendar 
                    title="Program Events Calendar" 
                    showAllPrograms={true}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsAndEvents;