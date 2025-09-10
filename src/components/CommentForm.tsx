"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

type User = {
  name: string;
  email: string;
};

export default function CommentForm() {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  // Fetch logged-in user info
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/user", { credentials: "include" });
        if (!res.ok) return;
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  async function getCSRFToken() {
    const res = await fetch("/csrf", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to get CSRF token");
    const data = await res.json();
    return data.csrf;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating before submitting.");
      return;
    }
    if (!user) {
      setError("You must be logged in to submit a comment.");
      return;
    }

    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const ratingText = "★".repeat(rating) + "☆".repeat(5 - rating);
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    try {
      const csrfToken = await getCSRFToken();

      const res = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({
          name: user.name,
          message: message + `\n\nRating: ${ratingText}`,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit comment");

      form.reset();
      setRating(0);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
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
          <div>
            {!user ? (
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Sign in with Google
              </Button>
            ) : (
              <Input name="name" value={user.name} disabled />
            )}
          </div>

          <Textarea name="message" placeholder="Your Comment" required />

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
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" disabled={loading || !user} className="w-full">
            {loading ? "Sending..." : "Send"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
