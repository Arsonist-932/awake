import { testimonials } from "@/data/data";
import { Card, CardTitle } from "./ui/card";
import StarRating from "./ui/Rating";

type TestimonialsProps = {
  name: string;
  rating: number;
  comment: string;
  dateCreated?: string;
  hourCreated: string;
};

const Testimonials = () => {
  return (
    <>
      <div>
        <div className="grid gap-3">
          {testimonials.map((testimonial: TestimonialsProps, index: number) => (
            <Card key={index} className="p-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
              </div>

              <p className="p-2 ">{testimonial.comment}</p>

              <div className="flex flex-col items-end justify-end">
                <div className="flex gap-2 justify-end text-sm">
                  <p>{testimonial.hourCreated}</p>

                  <p>{testimonial.dateCreated}</p>
                </div>
                <StarRating rating={testimonial.rating} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Testimonials;
