// (class,href)<content>

const banner = [
  "                       _            _ ",
  "       _              |_|          |_| ",
  "   ___| |_ _   _ _ __  _  ___ _ __  _ _   _ ___",
  "  / __| __| | | | '_ \\| |/ _ \\ '_ \\| | | | / __|",
  "  \\__ \\ |_| |_| | |_) | |  __/ | | | | |_| \\__ \\ ",
  "  |___/\\__|\\__,_| .__/|_|\\___|_| |_|_|\\__,_|___/",
  "                | |",
  "                |_|",
  "",
  "type (color1,)<help> for a list of available commands.",
];

const whoami = [
  "To define a human from a philosophical perspective is to go beyond mere biology and examine the qualities that distinguish humans as conscious and reflective beings. Humans are not only living organisms but also self-aware entities capable of thought, introspection, and deliberate action. Aristotle famously described humans as rational animals, emphasizing that reason allows us to navigate not only the physical world but also the ethical and social dimensions of life. This rationality is intertwined with our capacity for moral judgment: humans can discern between right and wrong, make choices guided by ethical principles, and reflect on the consequences of their actions. Yet, existentialist thinkers like Jean-Paul Sartre remind us that human existence is not predetermined; rather, we are beings defined by freedom, compelled to create our essence through choices, commitments, and projects. This freedom carries with it profound responsibility, as each decision contributes to the ongoing construction of the self. From a phenomenological perspective, humans are also defined by their lived experience—their conscious perception of the world, the meanings they assign to events, and their engagement with others. A human, therefore, is a being who inhabits both the objective reality of nature and the subjective realm of thought and emotion. We seek purpose, cultivate relationships, and grapple with questions of value, mortality, and identity. In this sense, humanity is not a fixed category but a dynamic process: humans are ever in the act of becoming, of interpreting, and of striving toward understanding. To be human is to dwell in the tension between the known and the unknown, the finite and the infinite, the individual and the collective—a creature of reflection, choice, and imagination, continually shaping both self and world.",
  "",
  "But wait.. you are Human ... right?",
];

const who = [
  "Hello, I'm Stupienius, a high school student from Taiwan.  I'm continuously learning about information technology and  am particularly focused on mastering C, Python, and JavaScript.  These languages are essential for various aspects of software   development, and I find the process of learning and applying them both challenging and rewarding.",
  "",
  "Beyond my interest in programming, I genuinely enjoy making new  friends and connecting with people from different backgrounds.   Building a network of like-minded individuals not only broadens   my perspective but also provides opportunities for collaborative   learning and growth.",
  "",
  "If you'd like to get to know me better or discuss our shared interests in technology, feel free to reach out. You can type (color1,)<contact> to get more information on how to connect with me. I'm always open to making new friends and exploring exciting new projects together.",
];

const help = [
  "(color1,)<help>           Show command helper",
  "(color1,)<contact>        About my social contact",
  "(color1,)<project>        Show my projects",
  "(color1,)<who>            Who is stupienius",
  "(color1,)<whoami>         Who are you",
  "(color1,)<song>           Listen to music",
  "(color1,)<banner>         Display the header",
  "(color1,)<history>        Your command history",
  "(color1,)<singer>         Best singer ever",
  "(color1,)<clear>          Clear terminal",
  "(color1,)<echo [text]>    Someone will repeat your messages",
  "(color1,)<coin>           Flip a coin",
  "(color1,)<hack>           Hack the website",
  "(color1,)<matrix>         Display matrix effect",
  "(color1,)<roll>           Roll a 6-sided dice",
];

const contact = [
  "(color1,https://github.com/stupienius)<github>         github/stupienius",
  "(color1,https://www.facebook.com/profile.php?id=100053935834116)<facebook>       facebook/Stupienius Null",
  "(color1,https://www.instagram.com/stupienius/)<instagram>      instagram/stupienius",
  "(color1,https://twitter.com/stupienius)<x>              x/stupienius",
];

const project = [
  "go to (color1,https://github.com/stupienius)<github> to see my whole preject.",
];

// const coffee = [
//   "    (  )   (   )  )",
//   "     ) (   )  (  (",
//   "     ( )  (    ) )",
//   "     _____________",
//   "    <_____________> ___",
//   "    |             |/ _ \\",
//   "    |               | | |",
//   "    |               |_| |",
//   " ___|             |\\___/",
//   "/    \\___________/    \\",
//   "\\_____________________/",
// ];

const song = ["best song ever"];

const hackSequence = [
  "Initializing hack...",
  "Connecting to mainframe...",
  "Bypassing security protocols...",
  "Access granted ✅",
  "Just kidding! 😉 You're safe 😎",
];

let commandHistory = [];
