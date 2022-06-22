import CeramicClient from '@ceramicnetwork/http-client';
import { useEffect, useState } from 'react';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids'
import DataModels from './DataModels';
import {useAuth} from "../../util/auth";

const API_URL = 'https://ceramic-clay.3boxlabs.com';

function Identity(props) {
    const [testDoc, setTestDoc] = useState();
    const [loadedDoc, setLoadedDoc] = useState();
    const [updatedDoc, setUpdatedDoc] = useState();
    const [streamId, setStreamId] = useState();
    const [ceramic, setCeramic] = useState();
    const [ethAddresses, setEthAddresses] = useState();
    const [ethereum, setEthereum] = useState();
    const [commits, setCommits] = useState([]);
    const auth = useAuth();

    //Sign Up with Metamask Wallet
    useEffect(() => {
        if(window.ethereum) {
            setEthereum(window.ethereum);
            (async() => {
                try {
                    const addresses = await window.ethereum.request({ method: 'eth_requestAccounts'})
                    setEthAddresses(addresses);
                }
                catch(e) {
                    console.log(e);
                }
            })();
        }
    }, []);

    useEffect(() => {
        if(ethereum && ethAddresses) {
            (async () => {
                const newCeramic = new CeramicClient(API_URL);

                const resolver = {
                    ...ThreeIdResolver.getResolver(newCeramic),
                }
                const did = new DID({ resolver })
                newCeramic.did = did;
                const threeIdConnect = new ThreeIdConnect()
                const authProvider = new EthereumAuthProvider(ethereum, ethAddresses[0]);
                await threeIdConnect.connect(authProvider)

                const provider = await threeIdConnect.getDidProvider();
                newCeramic.did.setProvider(provider);
                await newCeramic.did.authenticate();

                setCeramic(newCeramic);
            })();
        }
    }, [ethereum, ethAddresses]);

    useEffect(() => {
        if(ceramic) {
            (async () => {
                const doc = await TileDocument.create(ceramic, {hello: 'ceramic', address: 'ethAddresses'})
                setTestDoc(JSON.stringify(doc.content));

                const streamId = doc.id.toString();
                setStreamId(streamId);

                const newLoadedDoc = await TileDocument.load(ceramic, streamId)
                setLoadedDoc(JSON.stringify(newLoadedDoc.content));

                await doc.update({email: auth.user.email}, {tags: ['baz']});
                const newUpdatedDoc = await TileDocument.load(ceramic, streamId)
                setUpdatedDoc(JSON.stringify(newUpdatedDoc.content));

                let newCommits = [];
                for(let commitID of newUpdatedDoc.allCommitIds) {
                    const commitDoc = await TileDocument.load(ceramic, commitID);
                    newCommits.push(commitDoc.content);
                }
                setCommits(newCommits);
            })();
        }
    }, [ceramic, setCeramic, setTestDoc, setStreamId]);

    function getTestDocUI(testDoc, streamId) {
        let content = <h3>Test doc loading...</h3>
        let commitsUI = [];
        let key = 0;
        for(let commit of commits) {
            commitsUI.push(<div key={key++}>{JSON.stringify(commit)}</div>);
        }

        if(testDoc && streamId) {
            content = <div>
                <h2>Tests On Basic Streams</h2>
                <h3>Test doc: {testDoc}</h3>
                <div> {streamId} </div>
                <h3>Test doc from load: {loadedDoc}</h3>
                <h3>Test doc after update: {updatedDoc}</h3>
                <div>
                    <h3>Commits: </h3>
                    <div>
                        {commitsUI}
                    </div>
                </div>
            </div>;
        }
        return content
    }

    function getEthNeededPanel() {
        return <div >
            <div >You need ethereum</div>
            <div >Get <a href="https://metamask.io/" target="_blank" rel="noreferrer">MetaMask</a></div>
        </div>;
    }

    function getWaitingForEthPanel() {
        return <div>
            Waiting for Ethereum accounts...
        </div>;
    }

    function getAppPanel() {
        return <div>
            <h1>Ceramic is here</h1>
            {getTestDocUI(testDoc, streamId)}
            <div>
                <DataModels ceramic={ceramic} />
            </div>
        </div>;
    }

    function getWaitingForDIDPanel() {
        return <div>
            Waiting for a decentralized ID...
        </div>
    }

    return (
        <div>
            {
                ethereum ?
                    (
                        ethAddresses ?
                            (
                                ceramic ?
                                    getAppPanel() :
                                    getWaitingForDIDPanel()
                            )
                            :
                            getWaitingForEthPanel()
                    )
                    :
                    getEthNeededPanel()
            }
        </div>

    );
}

export default Identity;
