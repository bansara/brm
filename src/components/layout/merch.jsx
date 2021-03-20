import MerchItem from "./merchItem";

const Merch = ({ event }) => {
  const { merch } = event;
  return (
    <section className=" border-t-2 border-gray pt-16 mt-16">
      <div className="max-w-lg mx-auto mb-12">
        <h3 className="font-serif text-2xl text-center">Festival Merch</h3>
        <p className="text-center">
          Festival Merchandise can be purchased on our Bandcamp Store. See below
          for mechandise offerings related to the festival.{" "}
        </p>
        <p className="text-sm text-grayDark text-center">
          *Shipments will begin on April 20th.
        </p>
      </div>
      <div className="sm:grid justify-items-center sm:gap-4 sm:grid-rows-merchSm sm:grid-cols-merchSm xl:grid-cols-merchMd xl:grid-rows-merchMd mx-auto">
        {merch &&
          merch.map((item) => <MerchItem key={item.name} item={item} />)}
        <iframe
          title="wrm"
          style={{
            border: "0",
            width: "300px",
            height: "420px",
            margin: "0 auto 1rem",
          }}
          src="https://bandcamp.com/EmbeddedPlayer/album=2798013836/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
          seamless
        >
          <a href="https://brooklynragamassive.bandcamp.com/album/womens-raga-massive-compilation-v1">
            Women&#39;s Raga Massive Compilation v1 by Brooklyn Raga Massive
          </a>
        </iframe>
        <iframe
          title="in D"
          style={{
            border: "0",
            width: "300px",
            height: "420px",
            margin: "0 auto 1rem",
          }}
          src="https://bandcamp.com/EmbeddedPlayer/album=809944738/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
          seamless
        >
          <a href="https://brooklynragamassive.bandcamp.com/album/in-d">
            In D by Brooklyn Raga Massive
          </a>
        </iframe>
        <iframe
          title="Coltrane Raga Tribute"
          style={{
            border: 0,
            width: "300px",
            height: "420px",
            margin: "0 auto 1rem",
          }}
          src="https://bandcamp.com/EmbeddedPlayer/album=1279427232/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
          seamless
        >
          <a href="https://coltraneragatribute.bandcamp.com/album/coltrane-raga-tribute">
            Coltrane Raga Tribute by Brooklyn Raga Massive
          </a>
        </iframe>
        <iframe
          title="Ragamala"
          style={{
            border: 0,
            width: "300px",
            height: "420px",
            margin: "0 auto 1rem",
          }}
          src="https://bandcamp.com/EmbeddedPlayer/album=57909673/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/"
          seamless
        >
          <a href="https://goorganicorchestra.bandcamp.com/album/ragmala-a-garland-of-ragas">
            Ragmala: A Garland of Ragas by Go: Organic Orchestra
          </a>
        </iframe>
      </div>
    </section>
  );
};

export default Merch;
