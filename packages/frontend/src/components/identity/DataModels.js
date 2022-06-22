import CeramicClient from '@ceramicnetwork/http-client';
import { useEffect, useState } from 'react';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { ThreeIdConnect,  EthereumAuthProvider } from '@3id/connect'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '@glazed/did-datastore';
import { DID } from 'dids'

import { ModelManager } from '@glazed/devtools'
import { model as basicProfileModel } from '@datamodels/identity-profile-basic'
import { model as cryptoAccountsModel } from '@datamodels/identity-accounts-crypto'
import { model as webAccountsModel } from '@datamodels/identity-accounts-web'
import {useAuth} from "../../util/auth";

function DataModels(props) {
    const [published, setPublished] = useState();
    const [schemaURL, setSchemaURL] = useState();
    const [basicProfile, setBasicProfile] = useState();
    const ceramic = props.ceramic;
    const auth = useAuth();

    useEffect(() => {
        if(ceramic) {
            (async() => {
                const manager = new ModelManager(ceramic)
                manager.addJSONModel(basicProfileModel)

                const publishedBasicProfileModel = await manager.toPublished();
                setPublished(publishedBasicProfileModel);

                const model = new DataModel({ ceramic,  model: publishedBasicProfileModel});
                const schemaURL = model.getSchemaURL('BasicProfile');
                const dataStore = new DIDDataStore({ ceramic, model });
                await dataStore.set('basicProfile', { record: 'content' });
                const basicProfile = await dataStore.get('basicProfile');

                setSchemaURL(schemaURL);
                setBasicProfile(JSON.stringify(basicProfile));
            })();
        }
    }, [ceramic, setPublished]);

    return <div >
        <h2>Tests On Data Models {auth.user.email}</h2>

        <div>
            Published:
            {JSON.stringify(published)}
        </div>
        <div>
            Schema URL: {schemaURL}
        </div>
        <div>
            Basic Profile: {basicProfile}
        </div>
    </div>
}

export default DataModels;