import EventArtist from "./eventArtist";

const EventArtists = ({ performerCategories }) => {
  return (
    <div className="border-b-2 border-gray pb-12 flex-1 mt-0">
      {performerCategories.map((category) => (
        <div key={category.name}>
          <p className="font-sans uppercase my-4">{category.name}</p>
          {category.artists.map((artist) => (
            <EventArtist
              photoURL={artist.photoURL}
              name={artist.name}
              link={artist.link}
              key={artist.name}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventArtists;
