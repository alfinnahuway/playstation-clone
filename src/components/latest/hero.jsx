const Hero = () => {
  return (
    <section className="w-full h-[50vh] mb-10">
      <main className="w-full h-full bg-[url('https://image.api.playstation.com/pr/bam-art/159/562/af1c9420-6ffd-4c25-80a3-756e2fd9545c.jpg?w=1920&thumb=false')] bg-cover bg-center flex items-center">
        <img
          className="ml-60"
          width={300}
          height={300}
          src="https://image.api.playstation.com/pr/bam-art/160/033/253c8387-00d6-43d9-8226-6adabc633990.png?w=440&thumb=false"
          alt=""
        />
      </main>
    </section>
  );
};

export default Hero;
