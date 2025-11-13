import { Clock, Users, FileText, Calendar, Award, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TimelineItem {
  id: string;
  phase: string;
  time: string;
  description: string;
  icon: any;
  color: string;
  type: 'cycle1' | 'cycle2' | 'shared' | 'repeat';
  details?: string[];
}

interface EnhancedTimelineProps {
  items: TimelineItem[];
  title?: string;
}

const EnhancedTimeline = ({ items, title }: EnhancedTimelineProps) => {
  return (
    <Card className="bg-white shadow-xl border-0 overflow-hidden">
      <CardContent className="p-6">
        {/* Legend */}
        <div className="mb-6 flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-coop to-coop-light mr-2"></div>
            <span className="text-muted-foreground font-medium">Cycle 1 (Winter & Summer)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mr-2"></div>
            <span className="text-muted-foreground font-medium">Cycle 2 (Summer Only)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 mr-2"></div>
            <span className="text-muted-foreground font-medium">Combined Placement</span>
          </div>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Horizontal connecting line */}
          <div className="absolute top-8 left-8 right-8 h-1 bg-gradient-to-r from-coop/20 via-coop/40 via-blue-400/40 to-purple-400/20 rounded-full"></div>
          
          {/* Timeline items in horizontal grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 items-start">
            {items.map((item, index) => (
              <div key={item.id} className="relative flex flex-col items-center text-center group">
                {/* Timeline dot */}
                <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 mb-4 ${
                  item.type === 'cycle1' ? 'bg-gradient-to-br from-coop to-coop-light' :
                  item.type === 'cycle2' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                  item.type === 'shared' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                  'bg-gradient-to-br from-orange-500 to-orange-600'
                }`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content card */}
                <Card className={`w-full h-[220px] transition-all duration-300 hover:shadow-lg border-t-4 ${
                  item.type === 'cycle1' ? 'border-t-coop hover:border-t-coop-light' :
                  item.type === 'cycle2' ? 'border-t-blue-500 hover:border-t-blue-400' :
                  item.type === 'shared' ? 'border-t-purple-500 hover:border-t-purple-400' :
                  'border-t-orange-500 hover:border-t-orange-400'
                }`}>
                  <CardContent className="p-4 h-full flex flex-col justify-between">
                    <div className="flex-1">
                      {/* Cycle indicator badge */}
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${
                        item.type === 'cycle1' ? 'bg-coop/10 text-coop' :
                        item.type === 'cycle2' ? 'bg-blue-100 text-blue-600' :
                        item.type === 'shared' ? 'bg-purple-100 text-purple-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        {item.type === 'cycle1' ? 'Cycle 1' :
                         item.type === 'cycle2' ? 'Cycle 2' :
                         item.type === 'shared' ? 'Both' :
                         'Final'}
                      </div>
                      
                      <h4 className={`text-sm font-semibold mb-2 ${
                        item.type === 'cycle1' ? 'text-coop' :
                        item.type === 'cycle2' ? 'text-blue-600' :
                        item.type === 'shared' ? 'text-purple-600' :
                        'text-orange-600'
                      }`}>
                        {item.phase}
                      </h4>
                      
                      <div className="flex items-center justify-center mb-2">
                        <Clock className="w-3 h-3 text-muted-foreground mr-1" />
                        <span className="text-xs font-medium text-muted-foreground">
                          {item.time}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-tight">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Additional explanation */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            <strong className="text-coop">Cycle 1 students</strong> participate in both winter and summer placements with the same company. 
            <strong className="text-blue-600 ml-2">Cycle 2 students</strong> join for summer placements only, working alongside Cycle 1 students.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedTimeline;