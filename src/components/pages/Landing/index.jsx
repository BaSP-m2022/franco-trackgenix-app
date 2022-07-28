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
import { Input, Button, SelectDropdown } from 'components/Shared';

const landing = () => {
  return (
    <div className={styles.main}>
      <div className={styles.footerMain}>
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
                eleifend id. Maecenas euismod urna sagittis est elementum, nec condimentum mi
                auctor.
              </p>
              <div className={styles.learMore}>
                <Button text="Learn more" handler={() => {}} />
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
                  Phasellus bibendum at nisi a varius. Donec vel mauris vel ligula fermentum
                  elementum vitae vitae ante. Donec purus orci, malesuada sit amet dapibus non,
                  sodales placerat erat.
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
                  Cras blandit vehicula eros, id dapibus lacus tristique ac. Nam dapibus purus
                  semper, tincidunt massa sit amet, euismod metus. Nunc metus dui, tincidunt eget
                  massa nec, dapibus pellentesque tortor. Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Tempora ipsam nulla non at.
                </p>
                <div className={styles.buttonContainer}>
                  <Button text="More" handler={() => {}} />
                </div>
              </article>
              <article>
                <img src={work} alt="work" />
                <h3 className={styles.titleTypo}>Work traceability</h3>
                <p className={styles.paragraphTypo}>
                  Duis quis ipsum enim. Quisque iaculis risus turpis, quis ornare lorem fringilla
                  at. Vestibulum iaculis arcu et tortor tristique sollicitudin. Lorem, ipsum dolor
                  sit amet consectetur adipisicing elit. Neque repellat officiis perferendis ab
                  cumque quam distinctio velit assumenda sit minima.
                </p>
                <div className={styles.buttonContainer}>
                  <Button text="More" handler={() => {}} />
                </div>
              </article>
              <article>
                <img src={leaderships} alt="Leaderships" />
                <h3 className={styles.titleTypo}>Leadership and team management</h3>
                <p className={styles.paragraphTypo}>
                  Duis non turpis consequat, laoreet libero a, pulvinar mauris. In hac habitasse
                  platea dictumst. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Repellat quod, corrupti consequuntur esse eos!
                </p>
                <div className={styles.buttonContainer}>
                  <Button text="More" handler={() => {}} />
                </div>
              </article>
              <article>
                <img src={makingDecision} alt="Making Decision" />
                <h3 className={styles.titleTypo}>Decision making</h3>
                <p className={styles.paragraphTypo}>
                  Aliquam convallis elit in pharetra luctus. Aenean ultrices est eu justo gravida,
                  nec pretium arcu facilisis.
                </p>
                <p className={styles.paragraphTypo}>
                  Integer ipsum libero, finibus eget nisi non, volutpat aliquet leo. Nulla rhoncus
                  nisl id sem accumsan, cursus blandit tellus sollicitudin.
                </p>
                <div className={styles.buttonContainer}>
                  <Button text="More" handler={() => {}} />
                </div>
              </article>
            </div>
          </section>
          <section className={styles.formSection}>
            <h2 className={styles.sectionTypo}>Get in touch with us</h2>
            <form>
              <p>Full Name:</p>
              <Input placeholder="John Smith" onChange={() => {}} />
              <p>Email Address:</p>
              <Input placeholder="johnsmith@mail.com" onChange={() => {}} />
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
                <Input type="Radio" label="Low" name="priority" value="low" onChange={() => {}} />
                <Input
                  type="Radio"
                  label="Medium"
                  name="priority"
                  value="medium"
                  onChange={() => {}}
                />
                <Input type="Radio" label="High" name="priority" value="high" onChange={() => {}} />
              </div>
              <h5>Ask about our system</h5>
              <textarea
                name=""
                id=""
                cols="100"
                rows="10"
                placeholder="Enter your message"
              ></textarea>
              <div className={styles.robot_check}>
                <Input
                  type="checkbox"
                  label="I am not a robot"
                  name="not_a_robot"
                  value="not_a_robot"
                  onChange={() => {}}
                />
                <Input
                  type="checkbox"
                  label="Send me a copy"
                  name="send_me_a_copy"
                  value="send_me_a_copy"
                  onChange={() => {}}
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
              Maecenas ac bibendum lacus. Nunc scelerisque ante vitae ante pulvinar vulputate. Cras
              id posuere dolor. Praesent id sollicitudin tortor. Nullam ac tristique elit. Proin
              imperdiet ultricies nunc, nec consequat nisi aliquam ut. Praesent at est nisl. Ut nec
              metus sed dolor cursus imperdiet eget non erat. Donec vel maximus tortor. Donec
              gravida sollicitudin metus, ut porttitor nisl scelerisque nec. Aenean eu consequat
              felis.
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
      </div>
    </div>
  );
};

export default landing;
