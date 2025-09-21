import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Facebook } from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Dickson Osei Yeboah",
      role: "Founder & CEO",
      image: "/images/yeboah.png",
      bio: "Visionary leader with expertise in software architecture and business strategy. Passionate about creating innovative solutions that drive business growth.",
      social: {
        linkedin: "https://www.linkedin.com/in/dickson-osei-yeboah-56884728b/",
        github: "https://github.com/MrYEBOAH",
      },
    },
    {
      name: "Masood Acheampong",
      role: "Co-Founder & Managing Director",
      image: "/images/masood.png",
      bio: "Technical expert with deep knowledge in full-stack development and project management. Committed to delivering high-quality software solutions.",
      social: {
        linkedin: "https://www.linkedin.com/in/masood-acheampong-3793b4239",
        github: "https://github.com/masood-zone",
        facebook: "https://www.facebook.com/profile.php?id=100080657544884",
      },
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Meet Our Educators & Mentors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Gree Software Academy team is dedicated to guiding, mentoring,
            and inspiring students to achieve their full potential in tech. Our
            educators and mentors bring real-world experience and a passion for
            teaching.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 text-center border border-border hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-primary font-medium mb-4">{member.role}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {member.bio}
              </p>

              <div className="flex justify-center space-x-4">
                {member.social.linkedin && (
                  <Link
                    href={member.social.linkedin}
                    target="_blank"
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </Link>
                )}
                {member.social.github && (
                  <Link
                    href={member.social.github}
                    target="_blank"
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={20} />
                  </Link>
                )}
                {member.social.facebook && (
                  <Link
                    href={member.social.facebook}
                    target="_blank"
                    className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
