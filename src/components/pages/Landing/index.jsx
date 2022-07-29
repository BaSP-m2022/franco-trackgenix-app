import styles from './index.module.css';
import timeTrackingIcon from './assets/icons/time-tracking.png';
import manageTeam from './assets/images/manageTeam.jpg';
import productivity from './assets/images/productivity.jpg';
import leaderships from './assets/images/leaderships.jpg';
import work from './assets/images/work.jpg';
import makingDecision from './assets/images/makingDecision.jpg';
import reportsIcon from './assets/icons/reports.png';
import multipleRoles from './assets/icons/multiple-roles.png';
import resourceManagement from './assets/icons/resource-management.png';
import { Link } from 'react-router-dom';
import { Input, Button, SelectDropdown } from 'components/Shared';

const landing = () => {
  return (
    <div className={styles.main}>
      <main>
        <section className={styles.introSection}>
          <div>
            <h2 className={styles.headerTypo}>Manage your hours and teams with ease</h2>
            <p className={styles.paragraphTypo}>
              Use Trackgenix to track time, make decisions and upgrade your productivity
            </p>
            <p className={styles.introParagraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare lorem
              augue, id aliquam dolor accumsan vitae. Nullam cursus aliquam dolor ac hendrerit.
              Etiam tempus libero id consequat egestas. Aliquam feugiat massa ex, a commodo dolor
              eleifend id. Maecenas euismod urna sagittis est elementum, nec condimentum mi auctor.
            </p>
            <div className={styles.learMore}>
              <Button
                text="Learn more"
                handler={() => {
                  /* */
                }}
              />
            </div>
          </div>
          <figure>
            <img src={manageTeam} alt="manageTeam" />
          </figure>
        </section>
        <section>
          <div>
            <h2 className={styles.sectionTypo}>Functionalities</h2>
          </div>
          <div className={styles.functionalities}>
            <section>
              <h3 className={styles.titleTypo}>Time Tracking</h3>
              <figure>
                <img src={timeTrackingIcon} alt="Time Tracking" />
              </figure>
              <p className={styles.paragraphTypo}>
                Donec mi nisi, pretium vel tincidunt vel, egestas nec augue. Praesent et ultrices
                mauris. Aenean aliquam, sem et auctor euismod.
              </p>
            </section>
            <section>
              <h3 className={styles.titleTypo}>Reports</h3>
              <figure>
                <img src={reportsIcon} alt="Reports icon" />
              </figure>
              <p className={styles.paragraphTypo}>
                Phasellus bibendum at nisi a varius. Donec vel mauris vel ligula fermentum elementum
                vitae vitae ante. Donec purus orci, malesuada sit amet dapibus non, sodales placerat
                erat.
              </p>
            </section>
            <section>
              <h3 className={styles.titleTypo}>Multiple roles</h3>
              <figure>
                <img src={multipleRoles} alt="Multiple roles icon" />
              </figure>
              <p className={styles.paragraphTypo}>
                Vestibulum augue sem, aliquet at mollis quis, dignissim non velit. Nullam vitae
                sollicitudin nisl.
              </p>
            </section>
            <section>
              <h3 className={styles.titleTypo}>Resource management</h3>
              <figure>
                <img src={resourceManagement} alt="Resource management icon" />
              </figure>
              <p className={styles.paragraphTypo}>
                Donec ac mi tempor, gravida velit vitae, dignissim purus. Praesent pharetra lectus
                consequat, faucibus nibh ullamcorper, dignissim nunc.
              </p>
            </section>
          </div>
        </section>
        <section>
          <div className={styles.longTitle}>
            <h2 className={styles.sectionTypo}>Why does this mean an improvement in your work</h2>
          </div>
          <div className={styles.reasonsType}>
            <article>
              <img src={productivity} alt="Productivity" />
              <h3 className={styles.titleTypo}>Productivity booster</h3>
              <p className={styles.paragraphTypo}>
                Cras blandit vehicula eros, id dapibus lacus tristique ac. Nam dapibus purus semper,
                tincidunt massa sit amet, euismod metus. Nunc metus dui, tincidunt eget massa nec,
                dapibus pellentesque tortor. Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Tempora ipsam nulla non at.
              </p>
              <div className={styles.buttonContainer}>
                <Button
                  text="More"
                  handler={() => {
                    /* */
                  }}
                />
              </div>
            </article>
            <article>
              <img src={work} alt="work" />
              <h3 className={styles.titleTypo}>Work traceability</h3>
              <p className={styles.paragraphTypo}>
                Duis quis ipsum enim. Quisque iaculis risus turpis, quis ornare lorem fringilla at.
                Vestibulum iaculis arcu et tortor tristique sollicitudin. Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Neque repellat officiis perferendis ab cumque
                quam distinctio velit assumenda sit minima.
              </p>
              <div className={styles.buttonContainer}>
                <Button
                  text="More"
                  handler={() => {
                    /* */
                  }}
                />
              </div>
            </article>
            <article>
              <img src={leaderships} alt="Leaderships" />
              <h3 className={styles.titleTypo}>Leadership and team management</h3>
              <p className={styles.paragraphTypo}>
                Duis non turpis consequat, laoreet libero a, pulvinar mauris. In hac habitasse
                platea dictumst. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
                quod, corrupti consequuntur esse eos!
              </p>
              <div className={styles.buttonContainer}>
                <Button
                  text="More"
                  handler={() => {
                    /* */
                  }}
                />
              </div>
            </article>
            <article>
              <img src={makingDecision} alt="Making Decision" />
              <h3 className={styles.titleTypo}>Decision making</h3>
              <p className={styles.paragraphTypo}>
                Aliquam convallis elit in pharetra luctus. Aenean ultrices est eu justo gravida, nec
                pretium arcu facilisis.
              </p>
              <p className={styles.paragraphTypo}>
                Integer ipsum libero, finibus eget nisi non, volutpat aliquet leo. Nulla rhoncus
                nisl id sem accumsan, cursus blandit tellus sollicitudin.
              </p>
              <div className={styles.buttonContainer}>
                <Button
                  text="More"
                  handler={() => {
                    /* */
                  }}
                />
              </div>
            </article>
          </div>
        </section>
        <section className={styles.formSection}>
          <h2 className={styles.sectionTypo}>Get in touch with us</h2>
          <form>
            <p>Full Name:</p>
            <Input
              placeholder="John Smith"
              onChange={() => {
                /**/
              }}
            />
            <p>Email Address:</p>
            <Input
              placeholder="johnsmith@mail.com"
              onChange={() => {
                /**/
              }}
            />
            <SelectDropdown
              name="Choose a department"
              options={[
                { value: 'value1', label: 'label1' },
                { value: 'value2', label: 'label2' },
                { value: 'value3', label: 'label3' }
              ]}
            />
            <h5>Priority</h5>
            <div className={styles.formPriorities}>
              <Input
                type="Radio"
                label="Low"
                name="priority"
                value="low"
                onChange={() => {
                  /**/
                }}
              />
              <Input
                type="Radio"
                label="Medium"
                name="priority"
                value="medium"
                onChange={() => {
                  /**/
                }}
              />
              <Input
                type="Radio"
                label="High"
                name="priority"
                value="high"
                onChange={() => {
                  /**/
                }}
              />
            </div>
            <h5>Ask about our system</h5>
            <textarea
              className={styles.textarea}
              name=""
              id=""
              cols="60"
              rows="10"
              placeholder="Enter your message"
            ></textarea>
            <div className={styles.robot_check}>
              <Input
                type="checkbox"
                label="I am not a robot"
                name="not_a_robot"
                value="not_a_robot"
                onChange={() => {
                  /**/
                }}
              />
              <Input
                type="checkbox"
                label="Send me a copy"
                name="send_me_a_copy"
                value="send_me_a_copy"
                onChange={() => {
                  /**/
                }}
              />
            </div>
            <div className={styles.buttons}>
              <Button className={styles.submit_btn} text="Submit" />
              <Button className={styles.cancel_btn} text="Reset" />
            </div>
          </form>
        </section>
        <section className={styles.storySection}>
          <div>
            <h2 className={styles.sectionTypo}>Our story</h2>
          </div>
          <p className={styles.paragraphTypo}>
            Donec eu diam convallis, condimentum enim non, dictum magna. Integer quis orci
            ullamcorper, mattis lacus sed, porttitor velit. Vivamus enim ipsum, faucibus a mi vel,
            condimentum lacinia libero. Phasellus dignissim dui id lacinia posuere. Donec eleifend
            vehicula elit et finibus. Phasellus ultrices finibus eros. Nullam pretium quamcursus
            vestibulum efficitur. Cras quis volutpat neque. Maecenas non faucibus metus. Donec in
            est et nibh tempus pellentesque. Fusce in ante congue, tincidunt mauris ut, commodo
            magna. Aenean id arcu ac metus malesuada hendrerit quis ultrices diam. Pellentesque
            rhoncus porta interdum. Morbi lectus dui, porta et tortor ac, pharetra auctor elit.
          </p>
          <p className={styles.paragraphTypo}>
            Maecenas ac bibendum lacus. Nunc scelerisque ante vitae ante pulvinar vulputate. Cras id
            posuere dolor. Praesent id sollicitudin tortor. Nullam ac tristique elit. Proin
            imperdiet ultricies nunc, nec consequat nisi aliquam ut. Praesent at est nisl. Ut nec
            metus sed dolor cursus imperdiet eget non erat. Donec vel maximus tortor. Donec gravida
            sollicitudin metus, ut porttitor nisl scelerisque nec. Aenean eu consequat felis.
          </p>
        </section>
        <section className={styles.linkSection} aria-label="Links section">
          <div>
            <p>Products</p>
            <ol>
              <li>
                <a href="#">Functionalities</a>
              </li>
              <li>
                <a href="#">Downloads</a>
              </li>
              <li>
                <a href="#">Integrations</a>
              </li>
              <li>
                <a href="#">Extras</a>
              </li>
            </ol>
          </div>
          <div>
            <p>Company</p>
            <ol>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Clients</a>
              </li>
              <li>
                <a href="#">Resources</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ol>
          </div>
          <div>
            <p>Support</p>
            <ol>
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Tutorials</a>
              </li>
              <li>
                <a href="#">API</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ol>
          </div>
        </section>
      </main>
      <footer className={styles.container}>
        <div className={styles.greenLine}></div>
        <div className={styles.content}>
          <nav className={styles.rowLinks}>
            <Link
              to={{ pathname: 'https://www.linkedin.com/company/radium-rocket/' }}
              target="_blank"
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.69512 0C2.10208 0 0 2.10208 0 4.69512C0 7.28817 2.10208 9.39024 4.69512 9.39024C7.28817 9.39024 9.39024 7.28817 9.39024 4.69512C9.39024 2.10208 7.28817 0 4.69512 0ZM2.56098 4.69512C2.56098 3.51647 3.51647 2.56098 4.69512 2.56098C5.87378 2.56098 6.82927 3.51647 6.82927 4.69512C6.82927 5.87378 5.87378 6.82927 4.69512 6.82927C3.51647 6.82927 2.56098 5.87378 2.56098 4.69512Z"
                  fill="#373867"
                />
                <path
                  d="M0 11.5244C0 10.8172 0.573294 10.2439 1.28049 10.2439H8.10976C8.81695 10.2439 9.39024 10.8172 9.39024 11.5244V33.7195C9.39024 34.4267 8.81695 35 8.10976 35H1.28049C0.573294 35 0 34.4267 0 33.7195V11.5244ZM2.56098 12.8049V32.439H6.82927V12.8049H2.56098Z"
                  fill="#373867"
                />
                <path
                  d="M11.9512 11.5244C11.9512 10.8172 12.5245 10.2439 13.2317 10.2439H20.061C20.7682 10.2439 21.3415 10.8172 21.3415 11.5244V12.2654L22.0846 11.9469C23.3623 11.3994 24.7286 11.056 26.1104 10.9304C30.8482 10.4997 35 14.2226 35 19.0029V33.7195C35 34.4267 34.4267 35 33.7195 35H26.8902C26.1831 35 25.6098 34.4267 25.6098 33.7195V21.7683C25.6098 21.2023 25.3849 20.6595 24.9847 20.2592C24.5844 19.859 24.0416 19.6341 23.4756 19.6341C22.9096 19.6341 22.3668 19.859 21.9665 20.2592C21.5663 20.6595 21.3415 21.2023 21.3415 21.7683V33.7195C21.3415 34.4267 20.7682 35 20.061 35H13.2317C12.5245 35 11.9512 34.4267 11.9512 33.7195V11.5244ZM14.5122 12.8049V32.439H18.7805V21.7683C18.7805 20.5231 19.2752 19.3288 20.1557 18.4483C21.0362 17.5678 22.2304 17.0732 23.4756 17.0732C24.7208 17.0732 25.9151 17.5678 26.7956 18.4483C27.6761 19.3288 28.1707 20.5231 28.1707 21.7683V32.439H32.439V19.0029C32.439 15.7515 29.6032 13.1844 26.3423 13.4808C25.2257 13.5823 24.1217 13.8601 23.0934 14.3008L20.5654 15.3843C20.1698 15.5538 19.7154 15.5133 19.3561 15.2763C18.9967 15.0394 18.7805 14.6377 18.7805 14.2073V12.8049H14.5122Z"
                  fill="#373867"
                />
              </svg>
            </Link>
            <Link to={{ pathname: 'https://twitter.com/radiumrocket' }} target="_blank">
              <svg
                width="41"
                height="34"
                viewBox="0 0 41 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.1668 0.818363C27.1206 0.655 28.1886 0.600454 29.1936 0.770496C30.9887 1.07418 32.6467 1.90847 33.9574 3.15929C34.8141 3.17866 35.6561 3.00988 36.4011 2.76926C37.0316 2.56563 37.5642 2.31974 37.9375 2.12532C38.123 2.02865 38.2664 1.94619 38.3596 1.89036C38.4061 1.86249 38.4399 1.8414 38.46 1.82866L38.4779 1.81728C39.0347 1.44636 39.7761 1.51855 40.2505 1.99036C40.725 2.46229 40.8014 3.20314 40.4332 3.76199C40.0436 4.35347 39.5026 5.40789 38.8966 6.58929C38.8013 6.77505 38.7044 6.96395 38.6062 7.15468C38.2586 7.82995 37.9022 8.51246 37.57 9.098C37.3614 9.46566 37.1383 9.83893 36.9134 10.1615V10.6751C36.9277 12.5616 36.7113 14.4383 36.2722 16.264C35.9959 17.4127 35.6314 18.5413 35.1807 19.6394C34.0131 22.4846 32.2902 25.0686 30.1127 27.2405C27.9353 29.4124 25.3468 31.1287 22.4986 32.289C19.653 33.4483 16.605 34.0295 13.5325 33.9987C9.07839 34.0025 4.71798 32.7193 0.975964 30.3032C0.424805 29.9473 0.192751 29.2578 0.416621 28.6411C0.640491 28.0244 1.26086 27.6443 1.91195 27.7249C2.47541 27.7946 3.04272 27.8286 3.61049 27.8268C5.6505 27.8211 7.65166 27.3703 9.47858 26.5212C8.89788 26.2568 8.34347 25.9309 7.82541 25.5467C6.30266 24.4176 5.16976 22.8419 4.58433 21.0388C4.4322 20.5703 4.5362 20.0563 4.85852 19.6838C4.86429 19.6771 4.87012 19.6705 4.876 19.6639C4.53171 19.3569 4.20955 19.0227 3.91297 18.6632C2.57857 17.0457 1.8438 15.017 1.83296 12.9202L1.83292 12.9129L1.83294 12.8191C1.83294 12.3204 2.09698 11.8589 2.52696 11.6061C2.63596 11.5421 2.75148 11.4939 2.87033 11.4615C2.23563 10.1951 1.90557 8.79666 1.90798 7.37795C1.90723 5.77069 2.32706 4.1912 3.12577 2.79642C3.35635 2.39377 3.77061 2.13069 4.23309 2.09322C4.69557 2.05574 5.14679 2.24869 5.43918 2.60896C7.24489 4.83387 9.49846 6.65403 12.0535 7.9512C13.3669 8.61802 14.7449 9.13896 16.1627 9.50747C16.9577 9.71407 17.7651 9.87275 18.5807 9.98235C18.5448 8.62555 18.8127 7.26948 19.375 6.01647C20.1998 4.17836 21.6114 2.666 23.3884 1.71659C24.1409 1.31452 25.1399 0.994273 26.1668 0.818363ZM5.00945 14.9771C5.25266 15.6617 5.61447 16.3038 6.08357 16.8724C7.00527 17.9897 8.28457 18.7542 9.70508 19.0368C10.3378 19.1627 10.8039 19.7027 10.8358 20.3471C10.8678 20.9914 10.4574 21.5749 9.8402 21.7628C9.32901 21.9183 8.80529 22.0267 8.2756 22.0869C8.62562 22.5381 9.03735 22.9423 9.50148 23.2864C10.5542 24.0671 11.8242 24.5001 13.1345 24.5253C13.7291 24.5368 14.2522 24.9208 14.4413 25.4845C14.6305 26.0483 14.4448 26.6701 13.9775 27.0378C12.0093 28.5864 9.73337 29.6663 7.32174 30.2176C9.32054 30.8578 11.4168 31.1873 13.5372 31.1847L13.5535 31.1847C16.255 31.2128 18.935 30.7023 21.437 29.683C23.939 28.6638 26.2127 27.1561 28.1255 25.2482C30.0383 23.3403 31.5518 21.0704 32.5775 18.5711C32.9734 17.6064 33.2935 16.6151 33.5362 15.606C33.9224 14.0006 34.1124 12.3504 34.0995 10.6915L34.0994 10.6805V9.68625C34.0994 9.3451 34.2234 9.01557 34.4482 8.75899C34.5781 8.61071 34.8055 8.26825 35.1225 7.7094C35.4239 7.17826 35.7574 6.54062 36.1043 5.8668C36.1253 5.82605 36.1463 5.78509 36.1675 5.74394C35.2678 5.93931 34.2481 6.04171 33.1791 5.92619C32.8406 5.8896 32.5268 5.73148 32.2959 5.48115C31.3526 4.45812 30.0963 3.77714 28.7242 3.54501C28.1154 3.44201 27.3794 3.46558 26.6419 3.5919C25.8407 3.72915 25.1434 3.9693 24.7144 4.19849C23.487 4.85427 22.512 5.89889 21.9423 7.16851C21.3726 8.43813 21.2403 9.86095 21.5664 11.2138C21.6703 11.6451 21.5647 12.1002 21.2815 12.4417C20.9983 12.7831 20.5706 12.971 20.1275 12.9486C18.5453 12.8686 16.9798 12.6273 15.4549 12.2309C13.8418 11.8117 12.274 11.219 10.7796 10.4603C8.57955 9.34333 6.57593 7.88553 4.84097 6.14522C4.76182 6.5497 4.72164 6.96246 4.72191 7.37789L4.72191 7.38149C4.71995 8.41462 4.97349 9.43219 5.45994 10.3436C5.94639 11.2551 6.65067 12.0321 7.51007 12.6055C8.03163 12.9534 8.25999 13.6046 8.07004 14.2021C7.88009 14.7996 7.31768 15.1993 6.69092 15.1823C6.12327 15.1668 5.56036 15.0978 5.00945 14.9771Z"
                  fill="#373867"
                />
              </svg>
            </Link>
            <Link to={{ pathname: 'https://www.facebook.com/radiumrocket' }} target="_blank">
              <svg
                width="20"
                height="34"
                viewBox="0 0 20 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.73078 3.29503C9.37173 1.61201 11.5973 0.666504 13.918 0.666504H18.418C19.1083 0.666504 19.668 1.2405 19.668 1.94856V8.1024C19.668 8.81046 19.1083 9.38445 18.418 9.38445H13.918C13.8517 9.38445 13.7881 9.41147 13.7412 9.45955C13.6943 9.50764 13.668 9.57286 13.668 9.64086V12.9742H18.418C18.8029 12.9742 19.1663 13.1561 19.4032 13.4673C19.6401 13.7784 19.724 14.1842 19.6306 14.5672L18.1306 20.721C17.9915 21.2918 17.4916 21.6921 16.918 21.6921H13.668V32.7178C13.668 33.4258 13.1083 33.9998 12.418 33.9998H6.41797C5.72761 33.9998 5.16797 33.4258 5.16797 32.7178V21.6921H1.91797C1.22761 21.6921 0.667969 21.1181 0.667969 20.4101V14.2562C0.667969 13.5482 1.22761 12.9742 1.91797 12.9742H5.16797V9.64086C5.16797 7.26071 6.08984 4.97805 7.73078 3.29503ZM13.918 3.23061C12.2604 3.23061 10.6707 3.90597 9.49855 5.10813C8.32645 6.31028 7.66797 7.94076 7.66797 9.64086V14.2562C7.66797 14.9643 7.10833 15.5383 6.41797 15.5383H3.16797V19.128H6.41797C7.10833 19.128 7.66797 19.702 7.66797 20.4101V31.4357H11.168V20.4101C11.168 19.702 11.7276 19.128 12.418 19.128H15.942L16.817 15.5383H12.418C11.7276 15.5383 11.168 14.9643 11.168 14.2562V9.64086C11.168 8.89281 11.4577 8.17541 11.9734 7.64646C12.4892 7.11751 13.1886 6.82035 13.918 6.82035H17.168V3.23061H13.918Z"
                  fill="#373867"
                />
              </svg>
            </Link>
            <Link to={{ pathname: 'https://www.instagram.com/radium.rocket/' }} target="_blank">
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.3564 8.52188C24.3564 7.54861 25.1454 6.75962 26.1186 6.75962C27.0919 6.75962 27.8809 7.54861 27.8809 8.52188C27.8809 9.49515 27.0919 10.2841 26.1186 10.2841C25.1454 10.2841 24.3564 9.49515 24.3564 8.52188Z"
                  fill="#373867"
                />
                <path
                  d="M17.3073 8.96245C12.6843 8.96245 8.93662 12.7101 8.93662 17.3332C8.93662 21.9562 12.6843 25.7039 17.3073 25.7039C21.9304 25.7039 25.6781 21.9562 25.6781 17.3332C25.6781 12.7101 21.9304 8.96245 17.3073 8.96245ZM11.58 17.3332C11.58 14.17 14.1442 11.6058 17.3073 11.6058C20.4705 11.6058 23.0347 14.17 23.0347 17.3332C23.0347 20.4963 20.4705 23.0605 17.3073 23.0605C14.1442 23.0605 11.58 20.4963 11.58 17.3332Z"
                  fill="#373867"
                />
                <path
                  d="M26.5737 1.17858C20.4647 0.495811 14.15 0.495811 8.04099 1.17858C4.49522 1.57487 1.63273 4.36807 1.21586 7.93229C0.485338 14.1783 0.485338 20.4881 1.21586 26.7341C1.63273 30.2983 4.49522 33.0915 8.04099 33.4878C14.15 34.1705 20.4647 34.1705 26.5737 33.4878C30.1195 33.0915 32.982 30.2983 33.3989 26.7341C34.1294 20.4881 34.1294 14.1783 33.3989 7.93229C32.982 4.36807 30.1195 1.57487 26.5737 1.17858ZM8.33459 3.80561C14.2485 3.14465 20.3663 3.14465 26.2801 3.80561C28.6241 4.06759 30.5018 5.91728 30.7734 8.23936C31.48 14.2813 31.48 20.385 30.7734 26.427C30.5018 28.7491 28.6241 30.5988 26.2801 30.8607C20.3663 31.5217 14.2485 31.5217 8.3346 30.8607C5.9906 30.5988 4.11294 28.7491 3.84135 26.427C3.13469 20.385 3.13469 14.2813 3.84135 8.23936C4.11294 5.91728 5.9906 4.06759 8.33459 3.80561Z"
                  fill="#373867"
                />
              </svg>
            </Link>
            <Link to={{ pathname: 'https://github.com/radiumrocketapps' }} target="_blank">
              <svg
                width="31"
                height="34"
                viewBox="0 0 31 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.9079 29.5464C12.9078 29.3242 12.859 29.1048 12.7647 28.9037C12.6704 28.7025 12.533 28.5246 12.3623 28.3824C12.1916 28.2403 11.9917 28.1374 11.7768 28.0812C11.5619 28.0249 11.3372 28.0166 11.1187 28.0568C9.13582 28.4207 6.6322 28.4754 5.96654 26.6057C5.3861 25.1576 4.42464 23.8935 3.18409 22.9476C3.09558 22.8994 3.01122 22.844 2.93188 22.7819C2.82331 22.4955 2.63047 22.2487 2.37879 22.0742C2.12712 21.8996 1.82844 21.8054 1.52216 21.8041H1.51476C1.11426 21.8039 0.730019 21.9625 0.44613 22.245C0.162242 22.5275 0.00183611 22.9109 2.12382e-05 23.3114C-0.00590141 24.5466 1.22848 25.338 1.72925 25.6057C2.31977 26.1991 2.79435 26.8974 3.12862 27.6648C3.68038 29.2151 5.28387 31.5671 9.89319 31.2639C9.8947 31.3171 9.89614 31.3674 9.89688 31.4133L9.90353 31.8186C9.90353 32.2203 10.0631 32.6056 10.3472 32.8897C10.6313 33.1737 11.0165 33.3333 11.4183 33.3333C11.82 33.3333 12.2053 33.1737 12.4894 32.8897C12.7734 32.6056 12.933 32.2203 12.933 31.8186L12.9256 31.3364C12.9182 31.0493 12.9079 30.6336 12.9079 29.5464ZM29.0656 6.63438C29.1137 6.44503 29.1611 6.23498 29.2025 5.9983C29.4475 4.31026 29.2339 2.58739 28.5842 1.01025C28.5022 0.804648 28.3762 0.619462 28.2151 0.467678C28.054 0.315895 27.8616 0.201187 27.6515 0.131598C27.1122 -0.0503532 25.1213 -0.408332 21.3137 2.02503C18.1487 1.28022 14.854 1.28022 11.689 2.02503C7.89695 -0.37269 5.91625 -0.0473238 5.38224 0.124266C5.16694 0.191037 4.96931 0.305137 4.80383 0.458203C4.63835 0.61127 4.50922 0.799425 4.4259 1.00888C3.7629 2.61629 3.55166 4.3743 3.81498 6.09302C3.85197 6.2868 3.8919 6.4658 3.93333 6.62998C2.67847 8.30141 2.01007 10.3401 2.03176 12.4301C2.02767 12.8964 2.04915 13.3625 2.09611 13.8265C2.60203 20.7982 7.14626 22.8913 10.3125 23.6102C10.2467 23.7996 10.1868 24.0022 10.1336 24.2167C10.0386 24.6064 10.1022 25.0179 10.3102 25.3609C10.5182 25.7039 10.8537 25.9504 11.2432 26.0463C11.6327 26.1423 12.0443 26.0798 12.3879 25.8727C12.7314 25.6656 12.9788 25.3307 13.0758 24.9415C13.1722 24.4368 13.4192 23.9732 13.7843 23.6117C14.0051 23.4184 14.165 23.1651 14.2444 22.8826C14.3239 22.6002 14.3196 22.3007 14.232 22.0206C14.1444 21.7406 13.9773 21.492 13.751 21.3052C13.5247 21.1183 13.249 21.0013 12.9574 20.9683C7.72537 20.3707 5.45398 18.2391 5.11228 13.5484C5.07443 13.1769 5.05739 12.8035 5.06125 12.4301C5.03695 10.9406 5.52904 9.48859 6.45395 8.32077C6.54688 8.19902 6.64587 8.08201 6.75054 7.97018C6.93599 7.76267 7.06068 7.50807 7.11091 7.23433C7.16115 6.96059 7.13499 6.67831 7.03531 6.41846C6.93312 6.1451 6.85443 5.86351 6.80011 5.57677C6.67671 4.76141 6.71719 3.92962 6.91917 3.13009C8.23569 3.50192 9.47472 4.10717 10.5773 4.91701C10.7596 5.03845 10.9659 5.11927 11.1822 5.15398C11.3985 5.18869 11.6198 5.17649 11.8309 5.11819C14.8924 4.28736 18.12 4.28788 21.1812 5.11971C21.3935 5.17794 21.616 5.18944 21.8331 5.15344C22.0503 5.11743 22.2571 5.03477 22.4393 4.91114C23.5367 4.09794 24.7705 3.48728 26.0827 3.10795C26.2838 3.88827 26.3288 4.70063 26.2151 5.49839C26.1602 5.81276 26.0745 6.12095 25.9592 6.41849C25.8595 6.67834 25.8333 6.96062 25.8836 7.23436C25.9338 7.50809 26.0585 7.7627 26.2439 7.97021C26.3608 8.10186 26.4777 8.24387 26.5827 8.377C27.501 9.52505 27.9848 10.9604 27.9488 12.4301C27.9516 12.8233 27.9325 13.2164 27.8919 13.6076C27.5583 18.2361 25.278 20.3692 20.0216 20.9683C19.7299 21.0015 19.4542 21.1187 19.2279 21.3057C19.0017 21.4927 18.8346 21.7415 18.7471 22.0216C18.6596 22.3018 18.6554 22.6014 18.7349 22.884C18.8145 23.1665 18.9745 23.4198 19.1954 23.6131C19.572 23.9843 19.8196 24.4665 19.9017 24.9888C20.0041 25.3943 20.0511 25.8118 20.0415 26.2299V29.7653C20.0267 30.746 20.0267 31.4812 20.0267 31.8185C20.0267 32.2202 20.1863 32.6055 20.4704 32.8896C20.7544 33.1737 21.1397 33.3332 21.5414 33.3332C21.9432 33.3332 22.3285 33.1737 22.6125 32.8896C22.8966 32.6055 23.0562 32.2202 23.0562 31.8185C23.0562 31.4901 23.0562 30.7697 23.071 29.789V26.2299C23.0832 25.5602 23.0043 24.8918 22.8365 24.2433C22.7885 24.0304 22.7298 23.8201 22.6605 23.6132C24.9648 23.2304 27.0585 22.0423 28.5689 20.2605C30.0794 18.4786 30.9085 16.2186 30.9087 13.8827C30.9587 13.4002 30.9819 12.9152 30.9783 12.4301C31.0119 10.3379 30.338 8.2956 29.0656 6.63438Z"
                  fill="#373867"
                />
              </svg>
            </Link>
          </nav>

          <div className={styles.footerText}>
            <div className={styles.p1}>
              <p>Rosario, Argentina</p>
            </div>
            <div className={styles.p2}>
              <p>Copyright © 2022 Radium Rocket. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default landing;
