import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

export interface JobFiltersState {
  program?: string;
  status?: 'open' | 'upcoming' | 'closed';
  search?: string;
  modality?: 'onsite' | 'hybrid' | 'remote';
}

interface JobFiltersProps {
  filters: JobFiltersState;
  onFiltersChange: (filters: JobFiltersState) => void;
  className?: string;
}

export const JobFilters = ({ filters, onFiltersChange, className = "" }: JobFiltersProps) => {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const handleFilterChange = (key: keyof JobFiltersState, value: string) => {
    const newValue = value === "all" ? undefined : value;
    onFiltersChange({ ...filters, [key]: newValue });
  };

  const clearFilters = () => {
    setSearchValue("");
    onFiltersChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs, companies, or skills..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3">
        <Select value={filters.program || "all"} onValueChange={(value) => handleFilterChange("program", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Programs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Programs</SelectItem>
            <SelectItem value="Co-op">Co-op</SelectItem>
            <SelectItem value="Remote@AUI">Remote@AUI</SelectItem>
            <SelectItem value="Alternance">Alternance</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.status || "all"} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.modality || "all"} onValueChange={(value) => handleFilterChange("modality", value)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="remote">🏠 Remote</SelectItem>
            <SelectItem value="hybrid">🔄 Hybrid</SelectItem>
            <SelectItem value="onsite">🏢 Onsite</SelectItem>
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button variant="outline" size="sm" onClick={clearFilters} className="gap-1">
            <X className="w-4 h-4" />
            Clear ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.program && (
            <Badge variant="secondary" className="gap-1">
              Program: {filters.program}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange("program", "all")}
              />
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {filters.status}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange("status", "all")}
              />
            </Badge>
          )}
          {filters.modality && (
            <Badge variant="secondary" className="gap-1">
              Type: {filters.modality}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange("modality", "all")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};