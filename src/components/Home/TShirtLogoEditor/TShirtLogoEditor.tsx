import { useRef, useState } from "react";

const TShirtLogoEditor = () => {
  const canvasRef = useRef(null);
  const [logo, setLogo] = useState(null);
  const [dragPosition, setDragPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (isDragging) {
      setDragPosition({ x: e.clientX - 50, y: e.clientY - 50 });
    }
  };

  const saveFinalImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const tShirt = new Image();
    tShirt.src = "/tshirt.png"; // Predefined T-shirt image path

    tShirt.onload = () => {
      ctx.drawImage(tShirt, 0, 0, canvas.width, canvas.height);
      if (logo) {
        const logoImage = new Image();
        logoImage.src = logo;
        logoImage.onload = () => {
          ctx.drawImage(logoImage, dragPosition.x, dragPosition.y, 100, 100);
          const finalImage = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.download = "custom-tshirt.png";
          link.href = finalImage;
          link.click();
        };
      }
    };
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: "1px solid black", background: "#ccc" }}
      />
      <div>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
        <button onClick={saveFinalImage}>Save Final Image</button>
      </div>
      {logo && (
        <img
          src={logo}
          alt="Logo"
          style={{
            position: "absolute",
            top: dragPosition.y,
            left: dragPosition.x,
            width: "100px",
            height: "100px",
            cursor: "move",
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      )}
    </div>
  );
};

export default TShirtLogoEditor;
