

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom right, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)",
        }}
      />
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />

      <div className="absolute top-1/4 left-[15%] hidden lg:block animate-float">
        <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute top-1/3 right-[12%] hidden lg:block animate-float"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center">
          <svg
            className="w-7 h-7 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute bottom-1/4 left-[20%] hidden lg:block animate-float"
        style={{ animationDelay: "4s" }}
      >
        <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
      </div>
      <div
        className="absolute bottom-1/3 right-[18%] hidden lg:block animate-float"
        style={{ animationDelay: "3s" }}
      >
        <div className="w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-6 animate-fade-up">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            <span>Improve your health better</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Smart Meal Planning{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              with PlateWise
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Answer 3 daily questions:{" "}
            <span className="text-gray-900 font-medium">
              "What should I eat?"
            </span>
            ,{" "}
            <span className="text-gray-900 font-medium">
              "What do I need to buy?"
            </span>
            , and{" "}
            <span className="text-gray-900 font-medium">
              "Is my meal balanced?"
            </span>
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              className="px-8 py-4 text-lg font-semibold text-white rounded-full hover:shadow-glow transition-all duration-300 flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
              }}
            >
              Get Started
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
            <button className="px-8 py-4 text-lg font-semibold text-gray-900 border-2 border-gray-300 hover:border-green-500 rounded-full hover:bg-green-50 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          <div
            className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                AI
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Personalized
              </div>
            </div>
            <div className="text-center border-x border-gray-300">
              <div
                className="text-2xl sm:text-3xl font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Calories
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Auto Calculate
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                100+
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Recipes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="hsl(0 0% 100%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
