//our-domain.com/
import dns from 'dns';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList'




function HomePage(props) {

  return (

    <MeetupList meetups={props.meetups} />

  )
}



// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }




export async function getStaticProps() {
  // fetch data from an API

  // Node's resolver points at 127.0.0.1 on this machine; use public DNS
  // so the mongodb+srv:// SRV lookup works. Must stay inside this
  // server-only function, or 'dns' gets bundled for the browser.
  dns.setServers(['8.8.8.8', '1.1.1.1']);

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Missing MONGODB_URI');

  const client = new MongoClient(uri);

  const db = client.db();

  const meetupsCollection = db.collection('meetups');



  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
    },
    revalidate: 1,
  };
}


export default HomePage;