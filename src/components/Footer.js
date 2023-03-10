import React from "react";

function footer() {
  const date = new Date();
  return (
    <div className="w-full text-center  text-white text-sm nav-bg fixed bottom-0">
      <p>Webwiz Tournament. All rights reserved. {date.getFullYear()}.</p>
    </div>
  );
}

export default footer;
