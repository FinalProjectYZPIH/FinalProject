import { useProfileStore } from "../context/data/dataStore";

export default function ContactSidebar() {
  const { contacts } = useProfileStore((state) => state.defaultProfile);  // diese daten werden vom backend beim login empfangen

  console.log(contacts);
  return (
    <div>
      Contacts
      {contacts.map(contact => (<div key={contact.username}>
          {contact.username} (Online: {contact.Online ? 'Yes' : 'No'})
        </div>
      ))}
    </div>
  );
      }
      
//   (
//     <div>
//       Contacts
//       {contacts.map((contact, i) => (
//         <div key={contact[1]}>
//           {contact[0] && <>{"socketid"}</>}  {/**socketid */}
//           {contact[1] && <>{contact[1]}</>}  {/**username */}
//           {contact[2] && <>{`${contact[2]}`}</>}  {/**isonline */}
//         </div>
//       ))}
//     </div>
//   );
// }
