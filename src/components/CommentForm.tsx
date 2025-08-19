import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star } from "lucide-react";

export default function CommentForm() {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating before submitting.");
      return;
    }

    setError("");
    setLoading(true);

    const form = e.currentTarget;

    // Convert numeric rating → stars text
    const ratingText = "★".repeat(rating) + "☆".repeat(5 - rating);

    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      // Append stars directly to message
      message:
        (form.elements.namedItem("message") as HTMLTextAreaElement).value +
        `\n\nRating: ${ratingText}`,
    };

    try {
      await fetch("https://bot.attariarash.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      form.reset();
      setRating(0);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <h2 className="text-lg font-semibold">Leave a Comment</h2>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Input name="name" placeholder="Your Name" required />
          <Textarea name="message" placeholder="Your Comment" required />

          {/* Rating Stars */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer transition-colors ${
                    (hover || rating) >= star
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setRating(star);
                    setError("");
                  }}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600"></span>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
