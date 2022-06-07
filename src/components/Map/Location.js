import React from "react";

function Location({user}) {

  return (
    <div style={{
        color: 'white', 
        background: 'grey',
        padding: '15px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
      }}>
        {user.name}
    </div>
  );
}

export default Location;
