import { useState, useEffect, useRef } from "react";
import { JobCard } from "@/components/JobCard";
import { JobFilters, JobFiltersState } from "@/components/JobFilters";
import { useJobs } from "@/hooks/useJobs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, Briefcase, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      countRef.current += increment;
      if (countRef.current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(countRef.current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return <span className="font-bold">{count}</span>;
};

interface JobsSectionProps {
  program?: string;
  title?: string;
  description?: string;
  showAllPrograms?: boolean;
  showFilters?: boolean;
  className?: string;
}

export const JobsSection = ({ 
  program, 
  title = "Available Positions", 
  description = "Explore current job opportunities in our Work-Based Learning programs.",
  showAllPrograms = false,
  showFilters = false,
  className = ""
}: JobsSectionProps) => {
  const [filters, setFilters] = useState<JobFiltersState>({
    program: showAllPrograms ? undefined : program,
  });
  const navigate = useNavigate();

  const { data: jobs, isLoading, error } = useJobs(filters);

  if (error) {
    return (
      <div className={`py-12 ${className}`}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load job positions. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Briefcase className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold">{title}</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Filters - only show if showFilters is true */}
        {showFilters && (
          <div className="mb-8">
            <JobFilters 
              filters={filters} 
              onFiltersChange={setFilters}
              className="max-w-4xl mx-auto"
            />
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-12 h-12 rounded-md flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-14" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : jobs && jobs.length > 0 ? (
          <>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/5 rounded-full border border-primary/10">
                <Briefcase className="w-6 h-6 text-primary" />
                <p className="text-2xl font-semibold text-foreground">
                  Found <AnimatedCounter value={jobs.length} /> position{jobs.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="h-full">
                  <JobCard job={job} />
                </div>
              ))}
            </div>
            {!showAllPrograms && (
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/jobs')}
                  className="group"
                >
                  More Positions
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No positions found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {filters.program || filters.status || filters.search || filters.modality
                ? "Try adjusting your filters to see more results."
                : "Check back soon for new opportunities!"}
            </p>
            {!showAllPrograms && (
              <div className="mt-6">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/jobs')}
                  className="group"
                >
                  Browse All Positions
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};