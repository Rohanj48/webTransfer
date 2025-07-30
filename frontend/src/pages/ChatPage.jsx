import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import Peer from "peerjs";
import { customAlphabet } from 'nanoid';
import { data } from 'react-router-dom';


const ChatPage = () => {

    const [peer, setPeer] = useState(null);

    const [myId, setMyId] = useState("");
    const [remoteId, setRemoteId] = useState("");

    const [showJoin, setShowJoin] = useState(true);
    const [showStart, setShowStart] = useState(true);

    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const localStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);

    const callRef = useRef(null);
    const peerRef = useRef(null);

    useEffect(() => {

        const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
        const id = nanoid();
        setMyId(id)
        console.log(id);

        async function getLocalCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(
                    {
                        video: true, audio: true
                    });
                localStreamRef.current = stream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.log("user media error", error);
            }

        };

        getLocalCamera();

        const peer = new Peer(id, {
            host: window.location.hostname,
            port: 3443,
            path: "/peerjs",
            secure: true,
            config: {
                iceServers: [
                    { urls: "stun:stun.l.google.com:19302" }
                ]
            }
        });
        peer.on("open", () => {
            console.log("PeerJS connected with ID:", peer.id);

        });

        peer.on("call", (call) => {
            call.answer(localStreamRef.current);
            call.on("stream", (remote) => {
                remoteVideoRef.current.srcObject = remote;
            });
            callRef.current = call;
        });

        peerRef.current = peer;

    }, []);


    const handleUserJoin = () => {
        console.log("clicked");
        const call = peerRef.current.call(
            remoteId.trim().toUpperCase(),
            localStreamRef.current
        );

        if (!call) return setErr("Call failed—ID not found?");

        call.on("stream", (remote) => {
            remoteVideoRef.current.srcObject = remote;
        });

        call.on("error", (e) => setErr(e.message));
        callRef.current = call;

    }




    return (
        <>
            <div className='p-4 flex justify-center'>
                <div>
                    <video
                        ref={localVideoRef}
                        autoPlay
                    />
                </div>
                <div>
                    <video
                        ref={remoteVideoRef}
                        autoPlay
                    />

                </div>
            </div>
            <div className='m-4 p-4 flex-col space-y-2'>
                {showStart &&
                    <div className='flex'>
                        Start chat with id
                        <span className=' font-bold font-mono text-xl mx-3'>{myId}</span>
                        <button className='mx-2 px-4  bg-blue-500 text-black rounded-xl hover:bg-blue-600'
                        > Start </button>
                    </div>
                }
                {showJoin &&
                    <div className='flex'>
                        Join chat with id
                        <input
                            id="peerId"
                            type="text"
                            value={remoteId}
                            onChange={(e) => setRemoteId(e.target.value)}
                            className="border mx-2 rounded"
                            placeholder=" "
                            required
                        />
                        <button className='mx-2 px-4  bg-blue-500 text-black rounded-xl hover:bg-blue-600'
                            onClick={handleUserJoin}> Join </button>
                    </div>
                }
            </div>
        </>
    )
}

export default ChatPage