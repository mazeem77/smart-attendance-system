import React, { useState } from 'react';

const Writer = ({ writeFn }) => {
    const [message, setMessage] = useState('');

    const onSave = (e) => {
        e.preventDefault();
        writeFn(message);
        setMessage('');
    };

    return (
        <>
            <form onSubmit={onSave}>
                <div className="w-full flex flex-row justify-center items-center">
                    <input type="text" className="min-w-[40px] px-2 py-2 bg-transparent border-2 border-background mr-2 rounded focus:outline-none focus:border-main" placeholder="Enter Message..." value={message} onChange={(e) => setMessage(e.target.value)}></input>
                    <button className="bg-main border-2 border-main hover:border-2 hover:border-main hover:bg-transparent text-white rounded-md px-10 py-2 w-fit" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </>
    );
};

export default Writer;