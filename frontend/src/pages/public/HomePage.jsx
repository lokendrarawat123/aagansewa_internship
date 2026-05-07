import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Services from "./Services";
import Gallery from "./Gallery";
import About from "./About";
import Contact from "./Contact";
import Select from "../../components/shared/Select";
import { useNavigate } from "react-router-dom";
import {
  useGetAllDistrictQuery,
  useGetBranchByDistrictQuery,
} from "../../redux/features/districtSlice";
import Testimonials from "../../components/Homecomponents/Testonomials";
import CustomerScroll from "../../components/Homecomponents/TrustedCostumer";
import AboutAaganSewa from "../../components/Servicecomponents/Intro";
import GallerySlider from "../../components/Gallerycomponents/GallerySlider";
import Hero from "../../components/Homecomponents/Hero";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  // const districts = [{ value: "kathmandu", label: "Kathmandu" }];
  const { isLoading, data, error } = useGetAllDistrictQuery();
  const { data: branchData } = useGetBranchByDistrictQuery(selectedDistrict, {
    skip: !selectedDistrict,
  });

  const navigate = useNavigate();

  const districts =
    data?.data?.map((d) => ({
      value: d.district_id,
      label: d.district_name,
    })) || [];

  if (isLoading) {
    <div>Loading.........</div>;
  }

  // console.log(data);
  // console.log(branches);

  const availablePlaces =
    branchData?.data?.map((b) => ({
      id: b.branch_id,
      value: b.branch_id,
      label: b.branch_name,
      slug: b.branch_slug,
    })) || [];
  console.log(availablePlaces);
  // const availablePlaces = selectedDistrict
  //   ? placesByDistrict[selectedDistrict] || []
  //   : [];

  const images = [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const handlePlaceChange = (e) => {
    const branchId = e.target.value;
    const branch = availablePlaces.find((p) => p.id === Number(branchId));
    setSelectedPlace(branchId);
    if (branch) {
      navigate(`/services/${branch.slug}`, {
        state: { branchId: branch.id },
      });
    }
  };

  return (
    <>
      <div className=" ">
        <div className="relative w-full h-125 overflow-hidden ">
          <Hero />
        </div>
        <div className="">
          {/* INTRO */}
          <AboutAaganSewa />
          <GallerySlider />
          <Testimonials />
          <CustomerScroll />
        </div>
      </div>
    </>
  );
};

export default Home;
