import React from 'react';
import Writer from '../components/Writer/Writer';

const Write = () => {
    const onWrite = async(message) => {
        try {
            const ndef = new window.NDEFReader();
            await ndef.scan();
            await ndef.write({records: [{ recordType: "text", data: message }]});
            alert(`Value Saved!`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <Writer writeFn={onWrite}/>
    );
};

export default Write;