import React from 'react'
import {Outlet} from 'react-router-dom'
import Footer from '../../utils/Footer'
import Header from '../../utils/Header'
import Logo from "./../../../public/logo.png";

const Layout = () => {
  return (
<>
      <Header/>
       

          <main>
             {/* <section>
            <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="./assets/images/slider-1.png" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                        <img src="./assets/images/slider-2.png" class="d-block w-100" alt="..."/>
                    </div>
                    <div class="carousel-item">
                        <img src="./assets/images/slider-3.png" class="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section> */}
       <div
  className="border111"
  
>
  <Outlet />
</div>
          </main>



      <Footer/>
    </>
  )
}

export default Layout