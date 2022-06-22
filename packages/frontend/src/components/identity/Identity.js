import {CeramicClient} from '@ceramicnetwork/http-client';
import { useEffect, useState } from 'react';
import {ThreeIdResolver} from '@ceramicnetwork/3id-did-resolver';
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DID } from 'dids'
import {useAuth} from "../../util/auth";
const API_URL = 'https://ceramic-clay.3boxlabs.com';
import { useViewerRecord } from '@self.id/framework'
import { Provider } from '@self.id/framework'
import { useViewerConnection } from '@self.id/framework'
import { Button} from '@material-ui/core'
import { usePublicRecord } from '@self.id/framework'

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

    const [connection, connect, disconnect] = useViewerConnection()

    function ShowViewerName() {
        const record = useViewerRecord('basicProfile')

        const text = record.isLoading
            ? 'Loading...'
            : record.content
                ? `Hello ${record.content.name || 'stranger'}`
                : 'No profile to load'
        return <p>{text}</p>
    }

    //Sign Up with Metamask Wallet
    useEffect(() => {
        if(window.ethereum) {
            setEthereum(window.ethereum);
            (async() => {
                try {
                    const addresses = await window.ethereum.request({ method: 'eth_requestAccounts'})
                    setEthAddresses(addresses);

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
                }
                catch(e) {
                    console.log(e);
                }
            })();
        }
    }, []);

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



    return (
        <div>
            <Button >here</Button>
        </div>
    )

}


export default Identity;
