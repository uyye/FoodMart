import "./about.css"

export default function About() {
    return(
        <div className="about-container">
            <div className="about-content">
                <div className="about-up">
                    <div className="about-introduce">
                        <h1>About Us</h1>
                        <h2>MangaFood<br />Discover the perfect food and drink <br /> for every day</h2>
                        <p>FoodMart hadir sebagai solusi terbaik untuk memenuhi kebutuhan kuliner Anda dengan aneka makanan lezat, segar, dan berkualitas. Dari camilan ringan hingga hidangan utama yang menggugah selera, kami siap memanjakan lidah Anda dengan cita rasa istimewa yang cocok untuk semua kesempatan.<br/> Dengan pelayanan yang cepat dan ramah, FoodMart adalah pilihan tepat untuk pengalaman kuliner yang tak terlupakan!</p>
                    </div>
                    <div className="about-introduce">
                        <img src="https://asset.kompas.com/crops/fxADh7Paf6GHgE12oj3ke5Y-dN8=/0x0:1000x667/1200x800/data/photo/2021/12/21/61c161511efb8.jpg" alt="" />
                    </div>
                </div>
                <div className="about-down">
                    <div className="about-data">
                        <h3>48</h3>
                        <h4>Pengguna</h4>
                    </div>
                    <div className="about-data">
                        <h3>100</h3>
                        <h4>Product</h4>
                    </div>
                    <div className="about-data">
                        <h3>6</h3>
                        <h4>Outlet</h4>
                    </div>
                </div>
            </div>
            <div className="about-information"></div>
        </div>
    )
}