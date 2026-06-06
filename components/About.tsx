/**
 * About — "About Me" section with bio, specialization, and personal touch.
 */

interface AboutProps {
  bio?: string;
  image?: string;
  focus?: string;
  personalTouch?: string;
}

export default function About({
  bio = "",
  image,
  focus = "",
  personalTouch = "",
}: AboutProps) {
  if (!bio && !focus && !personalTouch) return null;

  return (
    <section id="about-me" className="relative py-28 px-4">
      {/* Divider glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
            About Me
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white">
            Who <span className="text-gradient">I Am</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Image */}
          {image && (
            <div className="md:col-span-1 flex justify-center">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-slate-800/60">
                <img
                  src={image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className={`flex flex-col gap-6 ${image ? "md:col-span-2" : "md:col-span-3"}`}>
            {bio && (
              <p className="text-slate-400 leading-relaxed">{bio}</p>
            )}

            {focus && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Focus Areas</h3>
                <p className="text-slate-400 leading-relaxed">{focus}</p>
              </div>
            )}

            {personalTouch && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Beyond Code</h3>
                <p className="text-slate-400 leading-relaxed">{personalTouch}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
