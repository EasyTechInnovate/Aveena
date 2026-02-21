import React from "react";

const BlogDetails = () => {
  return (
    <div className="mt-20">
      <div className="bg-light py-20 pt-20 px-2">
        <h1 className="text-darkBlue text-center text-3xl font-semibold">
          Brand Guidelines Creative Design.
        </h1>
        <div className="flex gap-2 items-center justify-center pt-2 text-md">
          <span className="text-darkGreen font-semibold">Blog</span>
          <span>
            <img src="/assets/blog/arrowLeft.svg" alt="" />
          </span>
          <span>Brand Guidelines Creative Design.</span>
        </div>
      </div>

      <div className="px-5 mt-5 max-w-7xl mx-auto">
        <img
          src="/assets/blog/thumbnail.png"
          alt=""
          className="h-40 md:h-90 w-full object-cover rounded-2xl"
        />

        <div className="py-4">
          <h1 className="text-darkBlue text-xl font-bold mb-2">
            Nulla bibendum natoque pulvinar proin gravida hendrerit.
          </h1>

          <p className="text-sm leading-6">
            Quam augue bibendum congue, praesent aliquet semper. Nulla bibendum
            natoque nibh sed pulvinar proin gravida hendrerit. Nullam sit amet
            vehicula ex. Vivamus ac enim eu lacus ornare sollicitudin. Integer
            lacus dui, gravida sit amet pellentesque eleifend vitae pellentesque
            sed, tristique rutrum lacus. Pellentesque mattis viverra erat, at
            lacinia elit. Quisque convallis pharetra metus finibus volutpat.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Aliquam semper libero ut lectus vehicula,
            quis sagittis magna dapibus.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 max-w-7xl mx-auto overflow-hidden my-4">
          <img
            src="/assets/blog/content1.png"
            alt=""
            className="w-full h-65 object-cover rounded-2xl"
          />

          <img
            src="/assets/blog/content2.png"
            alt=""
            className="w-full h-65 object-cover rounded-2xl"
          />
        </div>

        <div>
          <p className="text-sm leading-6 mt-4">
            Velit litora tortor diam netus elit habitasse.Pellentesque mattis
            viverra erat, at lacinia elit. Quisque convallis pharetra metus
            finibus volutpat. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Aliquam semper libero ut
            lectus vehicula, quis sagittis magna dapibus. Suspendisse sodales
            lorem tincidunt sagittis fermentum. Curabitur placerat ultrices
            dolor eu sagittis. Nullam ut felis vitae justo tristique consectetur
            id vitae quam. Nam posuere eros ut urna viverra fringilla quam ac
            Maecenas eleifend metus eu scelerisque elementum.
          </p>
          <p className="text-sm leading-6 mt-4">
            Consequat efficitur taciti pretium at curabitur vestibulum curabitur
            dapibus. efficitur lacus ipsum porttitor augue. Nullam sit amet
            vehicula ex. Vivamus ac enim eu lacus ornare sollicitudin. Integer
            lacus dui, gravida sit amet pellentesque sed, posuere nec eros.
            Pellentesque mattis viverra erat, at lacinia elit. Quisque convallis
            pharetra metus finibus volutpat.
          </p>
        </div>

        <img
          src="/assets/blog/content3.png"
          alt=""
          className="my-3 mt-10 h-40 md:h-90 w-full object-cover rounded-2xl"
        />

        <div className="my-5 ">
          <p className="text-sm leading-6">
            Velit litora tortor diam netus elit habitasse.Pellentesque mattis
            viverra erat, at lacinia elit. Quisque convallis pharetra metus
            finibus volutpat. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Aliquam semper libero ut
            lectus vehicula, quis sagittis magna dapibus. Suspendisse sodales
            lorem tincidunt sagittis fermentum. Curabitur placerat ultrices
            dolor eu sagittis. Nullam ut felis vitae justo tristique consectetur
            id vitae quam. Nam posuere eros ut urna viverra fringilla quam ac
            Maecenas eleifend metus eu scelerisque elementum.
          </p>
          <p className="text-sm leading-6 mt-4">
            Consequat efficitur taciti pretium at curabitur vestibulum curabitur
            dapibus. efficitur lacus ipsum porttitor augue. Nullam sit amet
            vehicula ex. Vivamus ac enim eu lacus ornare sollicitudin. Integer
            lacus dui, gravida sit amet pellentesque sed, posuere nec eros.
            Pellentesque mattis viverra erat, at lacinia elit. Quisque convallis
            pharetra metus finibus volutpat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
