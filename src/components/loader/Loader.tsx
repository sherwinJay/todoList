
const Loader = ({ }) => {
  return (
    <section className="grid place-content-center gap-8 h-full min-h-[350px]">
      <div className='flex flex-col justify-center items-center gap-3.5'>
        <span className="loader leading-12">
          Loading...
        </span>
        {/* <p className='text-xl text-center tracking-[.20rem]'>LOADING</p> */}
      </div>

    </section>
  )
}

export default Loader