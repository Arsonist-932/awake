"use client";

import { useState } from "react";
import { testimonials } from "@/data/data";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import StarRating from "../ui/Rating";
import { Button } from "../ui/button";

type TestimonialsProps = {
  name: string;
  rating: number;
  comment: string;
  dateCreated?: string;
  hourCreated: string;
};

const Testimonials = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTestimonials = testimonials.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {paginatedTestimonials.map(
          (testimonial: TestimonialsProps, index: number) => (
            <Card
              key={index}
              className="flex h-full flex-col justify-between p-4"
            >
              <div className="mb-2 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {testimonial.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base font-semibold">
                    {testimonial.name}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.dateCreated} à {testimonial.hourCreated}
                  </div>
                </div>
              </div>

              <CardContent className="px-0 py-2 text-sm">
                {testimonial.comment}
              </CardContent>

              <div className="mt-2 flex justify-end">
                <StarRating rating={testimonial.rating} />
              </div>
            </Card>
          ),
        )}
      </div>

      <div className="flex justify-center gap-2 pt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            variant={i + 1 === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(i + 1)}
            className={cn("h-8 w-8 p-0 text-sm")}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
