import React from 'react';
import './ImageInputForm.css';

const ImageInputForm = (props) => {
    const { onInputChange, onImageSubmitted, input } = props;
    return (
        <div>
            <p>Please enter the url of an image that contains faces below</p>
            <div className='center'>
                <div className='ImageInputForm_background pa4 br3 shadow-5'>
                    <input
                        id='imageInput'
                        placeholder='Enter the image url'
                        value={input}
                        type="text"
                        className='f4 pa2 w-70'
                        onChange={onInputChange} />
                    <button
                        className='w-15 grow f4 link ph3 pv2 dib black bg-lightest-blue'
                        onClick={onImageSubmitted}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageInputForm;