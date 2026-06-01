const imageByCategory = {
  Technology:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
  Business:
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1000&q=80",
  Culture:
    "https://images.unsplash.com/photo-1507878866276-a947ef722fee?auto=format&fit=crop&w=1000&q=80",
  Sports:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80",
  Career:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
  Academic:
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80",
  Health:
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
  Other:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80"
};

const titleImages = [
  {
    match: "music",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    match: "basketball",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80"
  },
  {
    match: "photography",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    match: "robotics",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    match: "startup",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80"
  }
];

export const getEventImage = (event) => {
  const title = event?.title?.toLowerCase() || "";
  const matchedImage = titleImages.find((item) => title.includes(item.match));

  if (matchedImage) {
    return matchedImage.image;
  }

  return imageByCategory[event?.category] || imageByCategory.Other;
};
