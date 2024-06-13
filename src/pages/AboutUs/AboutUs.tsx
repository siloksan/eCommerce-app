import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './AboutUs.module.scss';
import Andrey from '../../assets/imgs/Andrey.jpg';

const teamMembers = [
  {
    id: 1,
    name: 'Eugene',
    role: 'Frontend Developer',
    bio: 'Eugene is a seasoned front-end developer with a deep understanding technologies. He enjoys bridging the gap between design and functionality.',
    contributions:
      'Eugene has contributed to both frontend and backend development, ensuring smooth integration between the two.',
    github: 'https://github.com/siloksan',
    photo: Andrey,
  },
  {
    id: 2,
    name: 'Catherine',
    role: 'Frontend Developer',
    bio: 'Catherine is a seasoned frontend developer with a passion for creating intuitive user interfaces.',
    contributions:
      'Catherine has been instrumental in designing and implementing the user interface for our main application. She leads the UI/UX design efforts and is always focused on improving of design.',
    github: 'https://github.com/schemingcate',
    photo: Andrey,
  },
  {
    id: 3,
    name: 'Andrey',
    role: 'Frontend Developer',
    bio: 'Andrey is a seasoned front-end developer. He specializes in creating responsive and interactive web applications that enhance user experience.',
    contributions:
      'Andrey collaborates with designers to implement seamless user interfaces. He participates in regular code reviews and provides constructive feedback to his peers.',
    github: 'https://github.com/0404233',
    photo: Andrey,
  },
];

function AboutUs() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <div className={styles.teamSlider}>
        <Slider {...settings}>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles.teamMember}>
              <img src={member.photo} alt={`${member.name}`} className={styles.memberPhoto} />
              <div className={styles.infoBlock}>
                <h2>{member.name}</h2>
                <h3>{member.role}</h3>
                <p>
                  <strong>Bio:</strong> {member.bio}
                </p>
                <p>
                  <strong>Contributions:</strong> {member.contributions}
                </p>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.teamIntroduction}>
        <h1>Introduction to the Development Team</h1>
        <p>
          We are proud to introduce our talented and diverse development team, each member bringing their unique skills
          and contributions to our project. Our team&apos;s effective collaboration, combined with individual expertise,
          drives the success of our development efforts.
        </p>
        <h2>Effective Collaboration Methods</h2>
        <ul>
          <li>
            <strong>Regular meetings:</strong> Brief meetings to discuss progress, plans, and any blockers.
          </li>
          <li>
            <strong>Sprint Planning:</strong> Bi-weekly meetings to plan and prioritize tasks for the upcoming sprint.
          </li>
          <li>
            <strong>Code Reviews:</strong> Regular code review sessions to maintain code quality and share knowledge.
          </li>
          <li>
            <strong>Pair Programming:</strong> Collaborative coding sessions where two developers work together on the
            same task.
          </li>
          <li>
            <strong>Design Reviews:</strong> Sessions to review and improve UI/UX designs.
          </li>
          <li>
            <strong>Continuous Integration/Continuous Deployment (CI/CD):</strong> Automated pipelines to streamline the
            development and deployment process.
          </li>
        </ul>
        <p>
          Together, our team&apos;s expertise, dedication, and collaborative spirit drive the continuous success and
          innovation of our projects.
        </p>
      </div>
      <a href="https://rs.school/" className={styles.logoRSS} aria-label="RS School" />
    </div>
  );
}

export default AboutUs;
