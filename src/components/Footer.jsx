// import React from 'react';

// const Footer = () => {
//     return (
//         <footer className="app-footer">
//             <div className="footer-content">
//                 <p className="copyright">&copy; Academia Vault | All Rights Reserved</p>
//                 <p className="made-with">Made with ❤️ by Vishesh Unadkat</p>
//                 <div className="footer-links">
//                     {/* <a href="#">DMCA</a>
//                     <a href="#">Disclaimer</a>
//                     <a href="#">Privacy Policy</a>
//                     <a href="#">Terms & Conditions</a>
//                     <a href="#">About Us</a>
//                     <a href="#">Contact Us</a> */}
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;


import React from 'react';

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <p className="copyright">
                    &copy; Academia Vault | All Rights Reserved
                </p>

                <p className="made-with">
                    Made with ❤️ by Vishesh Unadkat
                </p>

                <div className="footer-links">
                    <a
                        href="https://www.linkedin.com/in/vishesh-unadkat/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="https://github.com/VisheshUnadkat13"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
