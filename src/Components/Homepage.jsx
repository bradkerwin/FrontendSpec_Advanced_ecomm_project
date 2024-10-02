const HomePage = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))

    return (
        <div>
            <h1 className="text-center">Welcome Back {user.name}!</h1>
            <h3 className="mt-3 text-center">Home of the Best Shopping Experience You Will Ever Have!</h3>
            <h3 className="mt-5 text-center">Check Out Our Fine Selection of Top Quality Products!</h3>
        </div>
    );
};

export default HomePage;