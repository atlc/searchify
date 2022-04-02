import { useState, useEffect } from "react";

export default function ScrollButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", toggle);
    }, []);

    function toggle() {
        const currentTop = document.documentElement.scrollTop;

        console.log({ currentTop, screenHeight: window.screen.height });

        // Display the button once we've scrolled down one quarter of the screen's height
        if (currentTop > window.screen.height / 4) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    function scrollUp() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <>
            {isVisible && (
                <div>
                    <button
                        className="rounded-3"
                        style={{ color: "#1DB954", backgroundColor: "#191414", border: "1px solid", borderColor: "#1DB954", fontSize: "6rem", position: "fixed", bottom: 0, right: 0 }}
                        onClick={scrollUp}>
                        ⇑
                    </button>
                </div>
            )}
        </>
    );
}
