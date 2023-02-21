import React from 'react';
import './Add2D.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Add2D = () => {
  return (
    <div className="file-card">

    <div className="file-inputs">
        <input type="file" />
        <button>
        <i>
                            <FontAwesomeIcon icon={faPlus} />
                        </i>
            Upload
        </button>
    </div>

    <p className="main">Supported files</p>
    <p className="info">PDF, JPG, PNG</p>

</div>
      

  )
}

export default Add2D
