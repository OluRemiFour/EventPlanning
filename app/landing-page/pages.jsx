import Image from "next/image";
import Link from "next/link";
import React from "react";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div>
      <div className="flex py-[20px] md:px-[60px] px-[20px] border-b shadow-sm justify-between items-center">
        <div className="md:flex items-center hidden gap-2">
          <Image
            aria-hidden
            src="/homeLogo.svg"
            alt="Logo"
            width={40}
            height={40}
            className=""
          />
          <h1 className="text-[var(--primary-color)] text-[32px] font-bold">
            Gather
          </h1>
        </div>

        <div className="flex gap-4 items-center">
          <Link
            href={"login"}
            className="text-[var(--primary-color)] cursor-pointer rounded-[8px] py-2 px-4 border border-[var(--primary-color)]"
          >
            Log In
          </Link>
          <Link
            href={"sign-up"}
            className="text-[var(--text-color)] cursor-pointer rounded-[8px] bg-[var(--primary-color)] py-2 px-4"
          >
            Create an Account
          </Link>
        </div>
      </div>

      <div className="md:py-[150px] py-[50px] px-[30px] md:px-[60px]">
        <div className="md:flex md:space-y-0 space-y-3 justify-between">
          <h1 className="lg:text-[45px] md:text[40px] text-[35px]">
            Seamless Event Planning, Simplified
          </h1>

          <div className="">
            <p className="text-[#999999] text-[18px] pb-8 md:pl-[12rem] lg:pl-[22rem]">
              Manage every aspect of your event—from initial concept and guest
              invitations to seamless execution and post- event analytics—all in
              one powerful, intuitive platform.
            </p>
            <Link
              href={"/login"}
              className="text-[var(--text-color)] cursor-pointer md:ml-[12rem] lg:ml-[22rem] rounded-[8px] bg-[var(--primary-color)] p-4"
            >
              Create an Event
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[url('/present.svg')] bg-cover bg-center h-[900px] w-f" />

      <div className="md:py-[150px] py-[50px] px-[60px]">
        <div className="md:flex justify-between space-y-4 md:space-y-0">
          <h1 className="text-[32px]">What We Do</h1>

          <p className="text-[#999999] text-[18px] md:w-[45%]">
            We transform the complex world of event planning into a seamless,
            intuitive, and empowering experience. Our platform is more than just
            a tool—it's your comprehensive event management partner, designed to
            turn your vision into extraordinary experiences.
          </p>
        </div>
      </div>

      <div className="md:grid p-[60px] space-y-4 md:space-y-0 md:my-4 gap-4 grid-cols-4">
        <div className="space-y-4">
          <h1 className="text-[26px]">Event Categories</h1>
          <p className="text-[#999999] md:pb-14 pb-8 text-[14px] pr-4">
            Our platform is your all-in-one solution, designed to bring every
            type of event to life—no matter the scale, purpose, or complexity.
          </p>

          <Link
            href={"/login"}
            className="text-[var(--text-color)] cursor-pointer rounded-[8px] bg-[var(--primary-color)] p-3"
          >
            Create Your First Event
          </Link>
        </div>

        <div>
          <Image src="frame1.svg" width={400} height={300} alt="Image" />
        </div>
        <div>
          <Image src="frame2.svg" width={400} height={300} alt="Image" />
        </div>
        <div>
          <Image src="frame3.svg" width={400} height={300} alt="Image" />
        </div>
      </div>

      <div className="bg-[#f8f8f8] my-14 px-[60px] py-8">
        <h1 className="text-[26px] pt-8 pb-4 font-medium text-center">
          How To Get Started
        </h1>
        <p className="text-[#999999] text-center pb-8">
          Follow these simple steps to bring your event to life in minutes.
        </p>

        <div className="md:flex items-center space-y-3 md:space-y-0 md:py-10 justify-center gap-8">
          <div className="bg-white px-4 py-8 md:w-[420px] h-[164px] border border-[#99999] rounded-md">
            <h1 className="text-[20px] font-medium pb-2">Create an Account</h1>
            <p className="text-[#999999]">
              Create your free account in seconds using your email or social
              login.
            </p>
          </div>
          <div className="bg-white px-4 py-8 md:w-[420px] h-[164px] border border-[#99999] rounded-md">
            <h1 className="text-[20px] font-medium pb-2">Set Up Your Event</h1>
            <p className="text-[#999999]">
              Use our intuitive event builder to add essential details like
              name, date, location, and description.
            </p>
          </div>
          <div className="bg-white px-4 py-8 md:w-[420px] h-[164px] border border-[#99999] rounded-md">
            <h1 className="text-[20px] font-medium pb-2">
              Customise & Publish
            </h1>
            <p className="text-[#999999]">
              Add tickets, upload media, and invite attendees. Preview your
              event before going live.
            </p>
          </div>
        </div>
      </div>

      <div className="md:my-32 px-[60px]">
        <div className="mx-auto w-full">
          <h1 className="font-medium text-center text-[32px] py-4">
            Frequently Asked Questions
          </h1>

          <div className="flex flex-wrap my-10 justify-center gap-8 items-center">
            <div className="w-[530px] md:h-[192px] p-4 border border-[#99999] rounded-md">
              <p className="py-4 font-medium text-[16px]">What is Gather?</p>
              <p className=" text-[#999999]">
                Gather is an all-in-one event management platform that helps you
                create, promote, and manage events with ease. Whether it’s a
                small gathering or a large-scale conference, we have the tools
                you need to succeed.
              </p>
            </div>
            <div className="w-[530px] h-[192px] p-4 border border-[#99999] rounded-md">
              <p className="py-4 font-medium text-[16px]">
                How do I create an event?
              </p>
              <p className="text-[#999999]">
                Simply sign up, click "Create an Event" on your dashboard, and
                follow the step-by-step guide to add event details, tickets, and
                media.
              </p>
            </div>
            <div className="w-[530px] h-[192px] p-4 border border-[#99999] rounded-md">
              <p className="py-4 font-medium text-[16px]">
                What if I need to cancel or reschedule my event?
              </p>
              <p className="text-[#999999]">
                ou can cancel or reschedule an event directly from your
                dashboard, and notifications will be sent to all attendees.
              </p>
            </div>
            <div className="w-[530px] h-[192px] p-4 border border-[#99999] rounded-md">
              <p className="py-4 font-medium text-[16px]">
                Can I export my event data?
              </p>
              <p className="text-[#999999]">
                Yes, you can export attendee lists, ticket sales, and analytics
                reports in various formats for your records.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-fit mx-auto py-12">
        <Image
          src="pic.svg"
          // className="w-full"
          width={1500}
          height={600}
          alt="pix"
        />
      </div>

      <div className="mx-auto w-fit md:mt-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          <p className="rounded-full text-center px-4 py-3 font-medium bg-[#f7f7f7]">
            About us
          </p>
          <p className="rounded-full px-4 py-3 text-center font-medium bg-[#f7f7f7]">
            Contact us
          </p>
          <p className="rounded-full px-4 py-3 text-center font-medium bg-[#f7f7f7]">
            Terms
          </p>
          <p className="rounded-full px-4 py-3 text-center font-medium bg-[#f7f7f7]">
            Privacy Policy
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
