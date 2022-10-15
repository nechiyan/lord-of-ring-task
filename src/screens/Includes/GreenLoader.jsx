import React from "react";
import loader from "./lotties/loader.json";
import Lottie from "react-lottie";

export default function GreenLoader() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loader,
        rendererSettings: {},
    };
    return (
        <Lottie options={defaultOptions} height={150} width={200} speed={6} />
    );
}
