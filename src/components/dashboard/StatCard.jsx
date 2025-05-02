import React from "react";
import { Card, CardContent } from "../components/ui/card"; // Update the path as needed
import { cn } from "../lib/utils"; // Update the path as needed

const StatCard = ({ title, value, icon, trend, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>

            {trend && (
              <div className="flex items-center mt-1">
                <span
                  className={cn(
                    "text-xs font-medium",
                    trend.isPositive ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trend.isPositive ? "+" : "-"}
                  {Math.abs(trend.value)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">from last period</span>
              </div>
            )}
          </div>

          {icon && (
            <div className="p-3 bg-gray-100 rounded-full">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
