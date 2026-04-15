/**
 * tests/internship-diary.spec.ts
 *
 * Production-quality Playwright script for bulk-creating VTU Internship Diary entries.
 *
 * Navigation flow (EXACT STEPS matching manual workflow):
 *  1. Go to sign-in page
 *  2. Fill email/password → Sign In
 *  3. After login, dashboard opens — dismiss "I Understand" modal if present
 *  4. Click "Internship Diary" from the LEFT SIDEBAR (no extra URL navigation!)
 *  5. Choose internship → pick date → Continue → fill form → add skills → Save
 *  6. After Save, click "Internship Diary" sidebar link again for next entry
 */
import { test, expect, Page, BrowserContext } from "@playwright/test";

// ──────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ──────────────────────────────────────────────────────────────────────────────
const CONFIG = {
  email: "xxx@acharya.ac.in",
  password: "xxxx",
  signInUrl: "https://vtu.internyet.in/sign-in",
  internshipRegex: /Java Full Stack With Cloud and Devops/i,
  skills: ["Java", "React", "HTML", "CSS", "JavaScript", "Docker", "Git"],
  hoursPerDay: "8",
};

// ──────────────────────────────────────────────────────────────────────────────
// DATA — 22 entries in each array
// ──────────────────────────────────────────────────────────────────────────────


const formattedDates = [
"Monday, February 2nd",
"Tuesday, February 3rd",
"Wednesday, February 4th",
"Thursday, February 5th",
"Friday, February 6th",
"Saturday, February 7th",
"Monday, February 9th",
"Tuesday, February 10th",
"Wednesday, February 11th",
"Thursday, February 12th",
"Friday, February 13th",
"Saturday, February 14th",
"Monday, February 16th",
"Tuesday, February 17th",
"Wednesday, February 18th",
"Thursday, February 19th",
"Friday, February 20th",
"Saturday, February 21st",
"Monday, February 23rd",
"Tuesday, February 24th",
"Wednesday, February 25th",
"Thursday, February 26th",
"Friday, February 27th",
"Saturday, February 28th",

"Monday, March 2nd",
"Tuesday, March 3rd",
"Wednesday, March 4th",
"Thursday, March 5th",
"Friday, March 6th",
"Saturday, March 7th",
"Monday, March 9th",
"Tuesday, March 10th",
"Wednesday, March 11th",
"Thursday, March 12th",
"Friday, March 13th",
"Saturday, March 14th",
"Monday, March 16th",
"Tuesday, March 17th",
"Wednesday, March 18th",
"Thursday, March 19th",
"Friday, March 20th",
"Saturday, March 21st",
"Monday, March 23rd",
"Tuesday, March 24th",
"Wednesday, March 25th",
"Thursday, March 26th",
"Friday, March 27th",
"Saturday, March 28th",
"Monday, March 30th",
"Tuesday, March 31st",

"Wednesday, April 1st",
"Thursday, April 2nd",
"Friday, April 3rd",
"Saturday, April 4th",
"Monday, April 6th",
"Tuesday, April 7th",
"Wednesday, April 8th",
"Thursday, April 9th",
"Friday, April 10th",
"Saturday, April 11th",
"Monday, April 13th",
"Tuesday, April 14th",
"Wednesday, April 15th",
"Thursday, April 16th",
"Friday, April 17th",
"Saturday, April 18th",
"Monday, April 20th",
"Tuesday, April 21st",
"Wednesday, April 22nd",
"Thursday, April 23rd",
"Friday, April 24th",
"Saturday, April 25th",
"Monday, April 27th",
"Tuesday, April 28th",
"Wednesday, April 29th",
"Thursday, April 30th",

"Friday, May 1st",
"Saturday, May 2nd"
];






const dairyDescriptions = [

  // ─── Web Technologies (Days 1–11) ───────────────────────────────────────────

  "During the initial phase of the internship, a comprehensive introduction to the organization, development environment, and project objectives was provided. The focus was on understanding the role of modern web technologies in building scalable software systems. An overview of full stack development was discussed, including the responsibilities of frontend and backend developers. Technologies such as JavaScript, Java, SQL, Spring Boot, and React were introduced as the main tools used throughout the internship program. The concept of client-server architecture was explained to help understand how applications communicate across networks. In addition to technical discussions, the importance of version control systems such as Git was explained along with collaboration practices used in software teams. The session also covered development tools like Visual Studio Code, terminal commands, and debugging tools that assist developers in writing efficient code. The overall objective of this day was to establish a strong foundation for the internship by ensuring familiarity with the technologies, workflows, and development practices that would be used in the upcoming weeks. This introduction helped create a clear roadmap for the learning journey ahead.",

  "On the second day, the focus shifted toward understanding JavaScript fundamentals and its importance in modern web applications. JavaScript was explained as a scripting language used to create dynamic behavior in web pages. Various primitive data types such as string, number, boolean, null, undefined, symbol, and bigint were studied. Practical examples were used to demonstrate how these data types behave during program execution. The concept of dynamic typing was discussed, explaining how JavaScript allows variables to store values of different types during runtime. The typeof operator was introduced as a method to identify the type of a variable. Through experimentation in the browser console, multiple examples were analyzed to understand how JavaScript evaluates expressions involving different data types. The session emphasized how correct understanding of data types helps developers avoid common bugs and unexpected results in programs. By the end of the session, a clear understanding of primitive data types and their behavior in JavaScript programs was developed.",

  "During this session, non-primitive data types in JavaScript were explored in detail. Objects and arrays were introduced as essential structures used to store complex data. Objects were explained as collections of key-value pairs used to represent real-world entities in applications. Several examples were demonstrated to show how object properties can store values and how methods can be defined within objects to perform operations. Arrays were studied as ordered collections capable of storing multiple values in a single variable. Techniques for accessing array elements using indexes were practiced. Iterating through arrays using loops was also demonstrated. Practical coding exercises involved creating arrays, modifying their contents, and accessing nested values. The relationship between objects and JSON data formats was discussed to help understand how web applications exchange data between servers and clients. This session helped develop a deeper understanding of structured data representation in JavaScript.",

  "Variables in JavaScript were studied in detail including the differences between var, let, and const declarations. The concept of scope was explained thoroughly, covering global scope, function scope, and block scope with practical examples for each. Hoisting was discussed as an important concept that affects variable declarations during execution, particularly explaining how var declarations are hoisted to the top while let and const remain in the temporal dead zone. The concept of the temporal dead zone associated with let and const variables was also explained in detail with code demonstrations. Best practices for variable naming and organization were emphasized to ensure readability and maintainability in code. Multiple exercises were performed to demonstrate how variable scope affects program logic and how closures capture variable references. By the end of the session, the importance of choosing the correct variable declaration keyword in different situations was clearly understood and applied in small programs.",

  "Type conversion and type coercion were the main topics covered in this session. JavaScript's ability to automatically convert data types during operations was explored through multiple examples showing implicit coercion in arithmetic and comparison operations. Explicit conversion using built-in functions like Number(), String(), Boolean(), parseInt(), and parseFloat() was explained with practical use cases. The difference between equality operators such as == and === was studied carefully to understand how JavaScript compares values and when type coercion occurs. Several examples demonstrated how unexpected type conversions can lead to logical errors in programs, such as comparing strings with numbers. Through practice exercises, the behavior of JavaScript expressions involving mixed data types was analyzed and predicted. This session strengthened understanding of how JavaScript evaluates operations involving different data types and how developers can write safer comparison logic.",

  "String manipulation in JavaScript was studied extensively to understand how text data is processed in web applications. The concept of string immutability was explained along with various string methods such as slice, substring, replace, replaceAll, split, trim, trimStart, and trimEnd. Practical examples demonstrated how these methods are used to process user input, sanitize form data, and format text for display. The use of template literals with backtick syntax was also introduced to simplify string concatenation and enable multi-line strings and embedded expressions. String search methods such as indexOf, includes, startsWith, and endsWith were also practiced to demonstrate text searching capabilities. Real-world examples such as formatting names, validating email patterns, and parsing query strings were implemented as exercises. Understanding string operations is essential when building interactive applications that process and display user-submitted data efficiently.",

  "Arrays were explored in depth including all commonly used methods that allow developers to manipulate collections of data. Core array methods such as push, pop, shift, unshift, slice, splice, concat, and indexOf were demonstrated with live coding examples showing real-world use cases. Iterating through arrays using for loops, for-of loops, and the forEach method was also discussed, highlighting the differences between each approach. The concept of array destructuring was introduced to extract values from arrays into individual variables cleanly. Spread syntax for copying and merging arrays was also covered with examples. Nested arrays representing two-dimensional data structures were created and accessed using double index notation. Sorting arrays using the sort method and its comparator function was demonstrated. These techniques collectively help developers process large sets of data efficiently and build dynamic list-based interfaces in web applications.",

  "Advanced array methods such as map, filter, and reduce were introduced as the foundation of functional programming in JavaScript. The map method was demonstrated as a way to transform every element of an array and return a new array without modifying the original. The filter method was used to create a new array containing only elements that pass a given condition, which is extremely useful for search and filtering features. The reduce method was explored as a powerful tool to accumulate array values into a single result such as a sum, product, or object. Chaining these methods together was also demonstrated to perform complex data transformations in a readable and concise way. Practical exercises were performed to convert arrays of objects into formatted outputs, filter products by price range, and calculate totals from sales data. Understanding these methods helped build a strong functional programming mindset essential for modern JavaScript and React development.",

  "JavaScript functions were introduced as reusable blocks of code designed to perform specific tasks and improve program structure. Function declarations, function expressions, and immediately invoked function expressions were all explained with code examples showing when each form is appropriate. Parameters, default parameter values, and the rest parameter syntax were studied to understand how functions can be made flexible and reusable. Return values and the concept of pure functions were discussed to encourage writing predictable and testable code. The concept of first-class functions was introduced, explaining that functions in JavaScript can be assigned to variables, passed as arguments, and returned from other functions. Higher-order functions that accept callbacks were created and practiced. Recursive functions were briefly introduced using the factorial problem to demonstrate how a function can call itself. Multiple exercises demonstrated how functions improve modularity and code organization in real applications.",

  "Arrow functions were explored in detail and compared with traditional function expressions to understand their syntax and behavioral differences. The concise syntax of arrow functions using the fat arrow notation was practiced with various examples ranging from single-line expressions to multi-line body functions. The key behavioral difference related to the 'this' keyword was explained carefully, showing that arrow functions do not create their own 'this' context but instead inherit it from the surrounding lexical scope. This distinction was illustrated using event handler examples where the 'this' binding behaves differently in object methods. Use cases where arrow functions are preferred such as array method callbacks and short utility functions were practiced. Cases where arrow functions should not be used such as object methods and constructors were also highlighted. By the end of the session, a clear understanding of when to use arrow functions versus traditional functions was developed.",

  "Event handling in JavaScript was studied in depth to understand how user interactions drive web application behavior. The concept of the DOM and how JavaScript interacts with HTML elements through document query methods was briefly reviewed. Event listeners were attached to elements using addEventListener for various event types including click, input, keydown, keyup, mouseover, and submit. The event object was studied to understand how it carries information about the user interaction such as target element, key pressed, and mouse coordinates. Event delegation was introduced as an efficient technique to handle events on dynamically created elements by listening on a parent element. Form validation using event handling was practiced by capturing submit events and preventing default form behavior to perform custom checks. Real-world exercises such as building an interactive counter, dynamic list manager, and form validator helped solidify understanding of how user-driven interfaces are built with JavaScript.",

  // ─── Core Java – Basics (Days 12–21) ────────────────────────────────────────

  "Introduction to the Java programming language was covered on this day, focusing on its history, platform independence, and the write-once-run-anywhere philosophy enabled by the Java Virtual Machine. The structure of a basic Java program including the package declaration, import statements, class definition, and the main method was explained step by step. Differences between Java and JavaScript were highlighted to avoid confusion since both languages were being studied during the internship. The Java Development Kit installation and compilation process using javac and execution using the java command were practiced in the terminal. Data types in Java were introduced including primitive types such as int, long, double, float, char, boolean, byte, and short. Type casting between compatible types and the concept of widening and narrowing conversions were explained. Scanner class usage for reading user input from the console was demonstrated. Basic arithmetic, relational, and logical operators were used in several small programs to compute values and display results.",

  "Java primitive data types were studied in depth with examples demonstrating the type safety that Java enforces as a statically typed language. The range and memory size of each primitive type were discussed to understand when to choose each type for different situations. Integer overflow and underflow were demonstrated to highlight the limitations of fixed-size numeric types. Wrapper classes such as Integer, Double, Character, and Boolean were introduced as object representations of primitives used in collections and generics. Autoboxing and unboxing were explained as Java's automatic conversion between primitives and their wrapper classes. String class was explored in detail including its immutability, string pool concept, and commonly used methods such as length, charAt, substring, equals, equalsIgnoreCase, toUpperCase, and trim. StringBuilder was introduced as a mutable alternative to String for efficient string concatenation in loops. Practical programs involving number manipulation and string processing were written to reinforce these concepts.",

  "Control flow structures in Java were studied to understand how program execution paths are controlled. Conditional statements including if, if-else, and if-else-if chains were practiced with various condition-based programs. The switch statement was studied for multiple condition branching and compared with if-else chains in terms of readability. The enhanced switch expression introduced in modern Java versions was also briefly explored. Looping structures including the while loop, do-while loop, and for loop were explained and compared based on their use cases. Nested loops were used to print various patterns including number triangles and star pyramids, which also served as the foundation for pattern programming exercises. The break and continue keywords were used to control loop flow. Label-based break and continue were mentioned for nested loop control. Programs involving series calculations such as Fibonacci, factorial, and prime number detection were written to strengthen understanding of loops and conditions together.",

  "Pattern programming in Java was explored extensively as a means to strengthen logical thinking and nested loop comprehension. Various star patterns including left-aligned triangle, right-aligned triangle, full pyramid, inverted pyramid, diamond pattern, and hollow square were implemented using nested for loops. Number-based patterns such as Floyd's triangle, Pascal's triangle, and number pyramids were also coded to understand how loop variables control pattern output. Character-based patterns using ASCII values and char arithmetic were written to generate alphabetic patterns. Each pattern required careful analysis of outer and inner loop conditions and understanding how row and column indices relate to the character being printed. These exercises developed strong problem-solving skills and the ability to visualize and translate visual patterns into algorithmic logic using loops. Pattern programming is considered a foundational exercise in Java learning that strengthens a programmer's ability to think systematically and construct loop-based solutions to visual problems.",

  "Number-based programming exercises in Java were practiced to strengthen mathematical thinking and algorithm design. Programs were written to check whether a number is a palindrome by reversing its digits and comparing with the original. Armstrong number detection was implemented by computing the sum of cubes of each digit and comparing it with the original number. Programs to find the sum of digits, reverse a number, count digits, and check divisibility were written using arithmetic and loop operations. The greatest common divisor was computed using both iterative subtraction and the Euclidean algorithm. The least common multiple was derived using the relationship between GCD and LCM. Prime number checking was optimized using the square root method. Programs to print all prime numbers in a range using a nested loop approach and the Sieve of Eratosthenes algorithm were implemented. These exercises reinforced arithmetic operations, modulus usage, and loop-based problem solving which are frequently tested in technical assessments and interviews.",

  "Object-oriented programming concepts were introduced through the study of classes and objects in Java. A class was explained as a blueprint that defines the structure and behavior of objects, while an object was described as an instance of a class occupying memory at runtime. Attributes or fields were defined inside classes to represent the state of objects and methods were defined to represent behaviors. The concept of encapsulation was introduced as a design principle to protect object state by making fields private and providing public getter and setter methods. Multiple class definitions and object creations were practiced, including classes representing real-world entities such as Student, BankAccount, and Employee. Object references and the difference between stack memory for primitives and heap memory for objects were explained. The concept of null references and NullPointerException was discussed as a common source of runtime errors. Programs involving multiple objects interacting with each other were written to demonstrate how object-oriented programs model real-world relationships.",

  "Constructors in Java were introduced as special methods used to initialize objects at the time of creation. The default constructor provided automatically by the compiler when no constructor is defined was explained. Parameterized constructors were written to allow passing initial values when creating objects, removing the need for separate setter calls. Constructor overloading was practiced by defining multiple constructors with different parameter lists in the same class, giving developers flexibility in how objects are created. The use of the 'this' keyword inside constructors to differentiate between instance variables and parameters with the same name was demonstrated with clear examples. Constructor chaining using 'this()' call to invoke one constructor from another was also explained and practiced to avoid code duplication. Copy constructors were introduced as a way to create a new object with the same field values as an existing object. These exercises provided a thorough understanding of how Java objects are properly initialized in real applications.",

  "The 'this' keyword in Java was studied in detail to understand all its roles within a class. It was demonstrated how 'this' refers to the current instance of the class and is used to resolve ambiguity between instance variables and method parameters having the same name. The use of 'this' in instance methods to call other methods of the same object was practiced. Returning 'this' from a method to enable method chaining was demonstrated through a fluent builder pattern example. Passing 'this' as an argument to other methods or constructors was also explored in programs where an object needs to pass itself as a reference. The difference between using 'this' in instance context versus the restriction of 'this' in static context was clarified. Through comprehensive examples and exercises, a strong understanding of the 'this' keyword and its practical applications in Java class design was developed.",

  "Java methods were studied comprehensively to understand how programs are organized into reusable functional units. Static methods and instance methods were distinguished, explaining when each type is appropriate. Method parameters including pass-by-value behavior for primitives and pass-by-reference behavior for objects were demonstrated with examples. Method overloading was introduced as the ability to define multiple methods with the same name but different parameter signatures, enabling flexible interfaces. Varargs were studied as a way to pass variable numbers of arguments to a method. Recursion was revisited and implemented for problems such as binary search, factorial calculation, and tower of Hanoi to demonstrate how methods call themselves. The call stack concept was explained in context of recursive method execution. Access modifiers on methods including public, private, protected, and package-private were explained with practical examples showing how they control visibility and access across classes.",

  "Java packages and access modifiers were explored to understand how code is organized and access is controlled in large applications. Packages were explained as namespaces that group related classes and interfaces together to avoid naming conflicts and improve project structure. Creating custom packages and importing classes from other packages using import statements was practiced. The four access levels in Java including public, protected, default, and private were studied with examples demonstrating which classes can access members at each level. The static keyword for class-level variables and methods was revisited and its memory implications explained. Final variables as constants and final methods that cannot be overridden were introduced. The concept of inner classes including static nested classes and non-static inner classes was briefly introduced. These organizational concepts are critical for maintaining clean and manageable code in real-world Java enterprise applications.",

  "Inheritance in Java was introduced as a core pillar of object-oriented programming that enables code reuse and hierarchical class design. The extends keyword was used to create subclasses that inherit fields and methods from parent classes. Method overriding was practiced to demonstrate how subclasses can provide their own implementation of inherited methods. The super keyword was introduced to access parent class constructors and methods from within a subclass. The Object class as the root of all Java class hierarchies was discussed and its methods such as toString, equals, and hashCode were overridden in custom classes. The concept of IS-A relationship was explained to determine when inheritance is appropriate in class design. Abstract classes were introduced as partially implemented classes that serve as templates for subclasses. Interfaces were introduced as fully abstract contracts that classes can implement to define behavior. Polymorphism through method overriding and interface implementation was demonstrated with a shapes hierarchy example.",

  // ─── Core Java – Collections & Multithreading (Days 22–31) ─────────────────

  "Exception handling in Java was introduced to understand how programs respond to runtime errors gracefully without crashing. The exception class hierarchy was explained, distinguishing between checked exceptions that must be handled at compile time and unchecked runtime exceptions. Try and catch blocks were written to wrap potentially failing code and provide error recovery logic. Multiple catch blocks were used to handle different exception types individually. The finally block was introduced as code that always executes regardless of whether an exception occurred, commonly used for resource cleanup. The throws keyword was used in method signatures to declare that a method may throw a checked exception, making callers responsible for handling it. Custom exception classes were created by extending the Exception class to represent application-specific error conditions. The try-with-resources statement was introduced for automatic resource management when working with files and streams. These practices ensure robust and reliable Java applications that handle errors predictably.",

  "The Java Collections Framework was introduced as a powerful set of classes and interfaces designed to store and manipulate groups of objects. The core collection interfaces including Collection, List, Set, Queue, and Map were explained with the hierarchy showing how they relate to each other. The ArrayList class was introduced as a resizable array implementation of the List interface supporting dynamic sizing and indexed access. LinkedList was explored as a doubly-linked node-based implementation useful for frequent insertions and deletions. Operations such as add, remove, get, contains, size, and iterator were practiced on both list types. The concept of generic types in collections using angle bracket notation was explained to ensure type safety and eliminate the need for casting. Iterating over collections using the enhanced for loop and Iterator interface was demonstrated. The difference between fail-fast and fail-safe iterators was briefly discussed. Programs simulating shopping carts, student grade lists, and task queues were implemented to practice real-world collection usage.",

  "Set and Map implementations in the Java Collections Framework were studied to understand how unique elements and key-value associations are stored and accessed. HashSet was introduced as an unordered collection that stores unique elements using hash-based storage, providing constant-time add, remove, and contains operations on average. LinkedHashSet was explained as a HashSet variant that maintains insertion order. TreeSet was studied as a sorted set implementation using a red-black tree, allowing elements to be stored and retrieved in natural or custom order. HashMap was introduced as the most commonly used Map implementation that stores key-value pairs and allows null keys and values. LinkedHashMap preserves insertion order while TreeMap maintains keys in sorted order. Operations on maps including put, get, remove, containsKey, and entrySet iteration were practiced. Real-world programs using maps to count word frequencies, group students by grade, and cache computed results were implemented to demonstrate practical collection usage.",

  "Comparable and Comparator interfaces were studied as mechanisms to define custom ordering for objects stored in sorted collections and arrays. The Comparable interface was implemented in a class to define natural ordering through the compareTo method, which allows objects to be compared to each other directly. Comparator was used as an external comparison strategy that can be passed to sorting methods or sorted collections. Multiple Comparator implementations were created to sort a list of Employee objects by name, salary, and age in ascending and descending order using Collections.sort and the List.sort method. Lambda expressions were used to write inline Comparators concisely. The Comparator.comparing factory method and its thenComparing chaining capability were demonstrated to build multi-field sort criteria. Arrays.sort and Collections.sort were compared in terms of the data structures they operate on. These sorting and ordering concepts are fundamental for working with data in enterprise Java applications.",

  "Java Generics were explored in depth to understand how they enable type-safe, reusable code. Generic classes and methods were written with type parameters, allowing the same logic to work with multiple data types without code duplication. Bounded type parameters using extends and super keywords were practiced to restrict what types can be used as type arguments. Wildcards including upper-bounded, lower-bounded, and unbounded wildcards were explained with use cases in method signatures. The type erasure mechanism was briefly discussed to explain how generics work at the bytecode level. Generic stack, pair, and utility method implementations were created as exercises. The concept of raw types and why they should be avoided in modern Java code was explained. Understanding generics is essential for working with the Java Collections Framework, writing utility libraries, and building flexible and type-safe APIs in enterprise development.",

  "Multithreading in Java was introduced as a technique to execute multiple tasks concurrently within a single program, improving performance and responsiveness. The Thread class and Runnable interface were both demonstrated as ways to create new threads, with an explanation of when each approach is preferred. Thread lifecycle states including new, runnable, blocked, waiting, timed-waiting, and terminated were explained and illustrated with diagrams. Thread methods such as start, run, sleep, join, and interrupt were practiced with examples showing how threads are created, paused, and coordinated. The concept of thread scheduling and the role of the JVM and operating system in deciding which thread runs at any given moment was discussed. Daemon threads were introduced as background service threads that terminate when the main thread ends. Programs simulating concurrent file downloads, background computation, and timer-based tasks were implemented to demonstrate real-world multithreading use cases.",

  "Thread synchronization was studied as a solution to race conditions and data inconsistency problems that arise when multiple threads access shared resources concurrently. The synchronized keyword was applied to methods and blocks to ensure mutual exclusion, allowing only one thread to execute protected code at a time. The concept of the monitor or intrinsic lock associated with every Java object was explained. Deadlock was discussed as a serious concurrency bug where two or more threads wait indefinitely for each other to release locks, along with strategies to avoid it such as lock ordering and timeout-based locking. The volatile keyword was introduced to ensure visibility of variable changes across threads without full synchronization overhead. Inter-thread communication using wait, notify, and notifyAll methods was practiced through a producer-consumer problem implementation. Thread-safe programming practices were emphasized as essential for building reliable concurrent Java applications.",

  "The java.util.concurrent package was explored to understand high-level concurrency utilities that simplify multithreaded programming beyond basic synchronization. ExecutorService and thread pools were introduced as a way to manage and reuse threads efficiently rather than creating new threads for every task. Fixed thread pools and cached thread pools were created using the Executors factory class and tasks were submitted using the submit and execute methods. The Future and Callable interfaces were studied to handle tasks that return results and may throw exceptions, unlike Runnable. Scheduled tasks using ScheduledExecutorService were practiced for periodic and delayed execution. Concurrent collection classes such as ConcurrentHashMap and CopyOnWriteArrayList were introduced as thread-safe alternatives to standard collections. AtomicInteger and other atomic classes were demonstrated for lock-free thread-safe counter operations. These tools make it significantly easier to write correct and performant concurrent Java applications.",

  "Java I/O streams were studied to understand how data is read from and written to external sources such as files and network connections. Byte streams using InputStream and OutputStream were introduced as low-level mechanisms for reading and writing raw bytes. Character streams using Reader and Writer classes were explained as suitable for text data handling with proper character encoding support. BufferedReader and BufferedWriter were introduced to improve I/O performance by reducing the number of actual read and write operations through internal buffering. FileReader and FileWriter were used to implement programs that read from and write to text files on the filesystem. The Scanner class was revisited for reading structured text from files. The java.nio package and the Files utility class were introduced as modern alternatives for common file operations such as reading all lines, writing content, and checking file existence. Serialization and deserialization using ObjectOutputStream and ObjectInputStream were practiced to persist and restore object state.",

  "Java 8 features including lambda expressions, functional interfaces, and the Stream API were studied as a major evolution in how Java programs are written. Lambda expressions were explained as concise anonymous function implementations primarily used with functional interfaces such as Runnable, Comparator, Predicate, Function, Consumer, and Supplier. Method references using double-colon notation were introduced as an even more concise alternative to lambdas when calling existing methods. The Stream API was studied as a powerful way to process sequences of elements using declarative pipeline operations including filter, map, flatMap, sorted, distinct, limit, and collect. Terminal operations such as forEach, reduce, count, min, max, and findFirst were practiced. The Collectors utility class was used to collect stream results into lists, sets, maps, and grouped structures. Optional was introduced as a container to represent the presence or absence of a value to avoid NullPointerException. These features dramatically improved code readability and expressiveness in modern Java development.",

  "Java database connectivity was introduced using JDBC as the standard API for interacting with relational databases from Java programs. The JDBC architecture including the DriverManager, Connection, Statement, PreparedStatement, and ResultSet components was explained. A MySQL database connection was established from a Java program by loading the MySQL JDBC driver and providing the connection URL, username, and password. SQL SELECT queries were executed using Statement and the ResultSet was iterated to retrieve and print data. PreparedStatement was introduced as the preferred way to execute parameterized queries to prevent SQL injection vulnerabilities. INSERT, UPDATE, and DELETE operations were performed programmatically and transaction management using commit and rollback was practiced to ensure data consistency. The try-with-resources block was used to automatically close database connections and prevent resource leaks. These concepts form the foundation for integrating Java backend applications with relational databases.",

  // ─── MySQL (Days 32–40) ──────────────────────────────────────────────────────

  "Database fundamentals were introduced to establish a clear understanding of how relational databases store and organize data. The concept of a database as a structured collection of data organized into tables with rows and columns was explained. The relational model was described, showing how tables are related to each other through primary keys and foreign keys. MySQL was introduced as the relational database management system used throughout the internship. MySQL Workbench was set up as the graphical interface for writing and executing SQL queries. Database creation, table creation, and the concept of schemas were practiced. Data types available in MySQL including INT, VARCHAR, CHAR, TEXT, DATE, DATETIME, FLOAT, DOUBLE, and BOOLEAN were explained with appropriate use cases. Constraints such as PRIMARY KEY, NOT NULL, UNIQUE, DEFAULT, and CHECK were applied to table columns to enforce data integrity rules. The importance of careful database design for building maintainable and performant applications was emphasized.",

  "SQL SELECT queries were studied in detail to understand how data is retrieved from relational database tables. The basic SELECT statement syntax was practiced to retrieve all columns and specific columns from a table. The WHERE clause was used to filter rows based on conditions using comparison operators, logical operators AND, OR, NOT, and special operators such as BETWEEN, IN, LIKE, and IS NULL. Column aliases using the AS keyword were applied to make query output more readable. The ORDER BY clause was used to sort results in ascending and descending order on single and multiple columns. The LIMIT and OFFSET clauses were practiced for pagination of query results. The DISTINCT keyword was used to eliminate duplicate rows from results. Aggregate functions including COUNT, SUM, AVG, MIN, and MAX were introduced to compute summary statistics from groups of rows. The GROUP BY clause was used with aggregate functions to group data by column values. The HAVING clause was distinguished from WHERE as a filter applied after grouping. Complex SELECT queries combining all these features were written on a sample student and sales database.",

  "Data modification operations in MySQL were studied including INSERT, UPDATE, and DELETE statements. The INSERT INTO statement was used to add single and multiple rows to tables simultaneously. The UPDATE statement was used with WHERE conditions to modify specific records and the importance of always including a WHERE clause to avoid unintended updates to all rows was emphasized. The DELETE statement was used to remove specific rows and the difference between DELETE and TRUNCATE was explained in terms of transaction safety and performance. The REPLACE INTO statement was introduced as a combination of insert and update. Transaction management using BEGIN, COMMIT, and ROLLBACK was practiced to ensure that groups of related data modification operations succeed or fail together as an atomic unit. The concept of ACID properties including atomicity, consistency, isolation, and durability was introduced as the standard for reliable database transactions. Auto-increment primary key generation and last insert ID retrieval were also demonstrated.",

  "SQL joins were explored comprehensively to understand how data from multiple related tables is combined in a single query. The need for joins was established by demonstrating the limitations of storing all data in a single table. INNER JOIN was practiced as the most common join type returning only rows that have matching values in both tables. LEFT OUTER JOIN was used to retrieve all rows from the left table along with matching rows from the right table, returning NULL for non-matching right table columns. RIGHT OUTER JOIN was demonstrated as the mirror of LEFT JOIN. FULL OUTER JOIN was explained conceptually and simulated using a UNION of LEFT and RIGHT joins since MySQL does not natively support it. CROSS JOIN was introduced to produce a Cartesian product of two tables. SELF JOIN was practiced to join a table with itself to find hierarchical relationships such as employees and their managers. Multi-table joins combining three or more tables were written to retrieve comprehensive data from a normalized schema. Proper use of table aliases made complex join queries more readable.",

  "Subqueries and derived tables in MySQL were studied to understand how queries can be nested inside other queries. Scalar subqueries returning a single value were used inside WHERE conditions to filter rows based on computed results from another table. Row subqueries and table subqueries were explained for more complex filtering scenarios. The IN and NOT IN operators were used with subqueries to check membership in a result set. Correlated subqueries that reference the outer query were explained and differentiated from independent subqueries. The EXISTS operator was practiced to check whether a subquery returns any rows, commonly used for existence checks in business logic. Derived tables using subqueries in the FROM clause were used to perform multi-step data transformations. Common Table Expressions using the WITH clause were introduced as a more readable alternative to nested subqueries for complex multi-level queries. These techniques are essential for writing advanced queries against normalized relational schemas.",

  "MySQL functions were studied comprehensively covering string functions, numeric functions, date and time functions, and conditional functions. String functions including CONCAT, LENGTH, SUBSTRING, UPPER, LOWER, TRIM, REPLACE, INSTR, and FORMAT were practiced on sample data. Numeric functions such as ROUND, FLOOR, CEILING, ABS, MOD, POWER, and SQRT were used in calculated column expressions. Date and time functions including NOW, CURDATE, CURTIME, DATE_FORMAT, DATEDIFF, DATE_ADD, YEAR, MONTH, DAY, and HOUR were practiced for date-based calculations in queries. The CASE WHEN THEN ELSE END expression was introduced as a conditional logic tool within SELECT statements to classify data into categories. The IFNULL and COALESCE functions were used to handle NULL values in query results by substituting default values. Window functions including ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD, and SUM OVER were introduced for advanced analytical queries that compute values across related rows without grouping.",

  "Database normalization concepts were introduced to understand how to design relational schemas that minimize redundancy and ensure data integrity. The problems of data redundancy, update anomalies, insert anomalies, and delete anomalies in unnormalized tables were demonstrated with examples. The First Normal Form was explained as the requirement that each column must contain atomic indivisible values and each row must be uniquely identifiable. The Second Normal Form required elimination of partial dependencies for tables with composite primary keys. The Third Normal Form required removal of transitive dependencies where non-key columns depend on other non-key columns. The concept of a foreign key as a referential integrity constraint ensuring that a value in one table corresponds to an existing value in another table was reinforced. Practical normalization exercises converted a denormalized employee department database into third normal form by identifying functional dependencies and splitting tables appropriately. Normalization is a critical skill for designing databases that scale well and maintain data consistency over time.",

  "Database indexing in MySQL was explored to understand how indexes improve query performance on large tables. The concept of a full table scan and why it becomes slow as data grows was explained first. B-tree indexes as the default MySQL index structure were introduced, explaining how they enable fast lookups by organizing data in a sorted tree structure. The CREATE INDEX and DROP INDEX commands were practiced along with the SHOW INDEX command to inspect existing indexes. Primary key indexes and unique indexes were distinguished from regular indexes. Composite indexes on multiple columns were created and the importance of column order in a composite index was explained through query analysis. The EXPLAIN statement was introduced as a tool to analyze query execution plans and determine whether indexes are being used. Covering indexes that include all columns needed by a query were demonstrated as an optimization technique. The trade-off between read performance improvements and write performance overhead when adding indexes was discussed to guide real-world indexing decisions.",

  "Stored procedures, triggers, and views in MySQL were introduced as advanced database programming features that encapsulate logic within the database. Stored procedures were created using the CREATE PROCEDURE syntax with IN, OUT, and INOUT parameters to encapsulate reusable SQL logic that can be called from applications. Variables, conditional logic using IF and CASE, and loops using WHILE and REPEAT were used inside stored procedures to build business logic at the database level. Views were created as virtual tables representing the result of a stored SELECT query, providing a simplified interface over complex joins and calculated columns. Updatable views and their limitations were briefly discussed. Triggers were introduced as database objects that automatically execute in response to INSERT, UPDATE, or DELETE events on a table. BEFORE and AFTER triggers were written to enforce business rules, maintain audit logs, and automatically compute derived column values. These features enable powerful server-side data management logic in MySQL applications.",

  // ─── DSA – Arrays (Days 41–50) ───────────────────────────────────────────────

  "Introduction to Data Structures and Algorithms was provided to establish the importance of efficient problem solving in software development. The distinction between a data structure as a way of organizing data and an algorithm as a step-by-step procedure for solving a problem was clarified. Time complexity and space complexity were introduced as the two primary measures used to evaluate algorithm efficiency. Big O notation was explained in detail, covering O(1) constant, O(log n) logarithmic, O(n) linear, O(n log n) linearithmic, O(n²) quadratic, and O(2ⁿ) exponential complexity classes with visual comparisons. Best case, worst case, and average case analysis were distinguished to give a complete picture of algorithm performance. Common performance pitfalls such as nested loops and repeated memory allocations were identified. The importance of selecting the right data structure for a given problem was emphasized with examples. This theoretical foundation prepared the mindset needed to approach DSA problems analytically rather than through trial and error.",

  "Arrays as a fundamental data structure were introduced and explored in depth. An array was defined as a contiguous block of memory that stores elements of the same type accessed via zero-based integer indices. The difference between static arrays with fixed size and dynamic arrays that resize automatically such as ArrayList in Java was explained. Array declaration, initialization with values, and default initialization were practiced. Time complexity of common array operations including access O(1), search O(n), insertion at end O(1) amortized, insertion at middle O(n), and deletion O(n) were analyzed. Multi-dimensional arrays were introduced as arrays of arrays used to represent matrices and grids, and two-dimensional array declaration and traversal were practiced. Arrays were compared to other sequential structures to identify when they offer performance advantages. Programs to find the maximum, minimum, sum, and average of array elements were implemented as foundational exercises on array traversal.",

  "Array searching algorithms were studied starting with linear search and progressing to binary search. Linear search was implemented iteratively and its O(n) time complexity was analyzed as suitable for unsorted small arrays. Binary search was introduced as a divide and conquer algorithm that works on sorted arrays by repeatedly halving the search space to achieve O(log n) time complexity. Both iterative and recursive implementations of binary search were written and compared. The requirement that the array must be sorted before applying binary search was emphasized. The lower bound and upper bound variants of binary search for finding the first and last occurrences of an element in a sorted array with duplicates were implemented. Searching in a rotated sorted array was introduced as a variation where the pivot must be found first. Template-based binary search problem-solving approach was discussed where the key insight is to identify what condition determines which half to discard. These problems developed structured thinking essential for technical interview preparation.",

  "Array sorting algorithms were studied starting with simple comparison-based sorts and moving toward more efficient algorithms. Bubble sort was implemented and its O(n²) worst and average case complexity was explained along with the optimization using the early exit flag when no swaps occur in a pass. Selection sort was implemented by repeatedly finding the minimum element from the unsorted portion and placing it at the front. Insertion sort was implemented by building a sorted portion one element at a time and was noted as efficient for nearly sorted arrays. Merge sort was implemented as a divide and conquer algorithm with O(n log n) guaranteed time complexity by recursively splitting arrays and merging sorted halves. Quick sort was implemented using a partition scheme and its average O(n log n) performance was explained along with its O(n²) worst case with a sorted array and poor pivot selection. Counting sort was introduced as a non-comparison sort with O(n + k) complexity suitable for small integer ranges. Understanding these algorithms helps developers choose the right sorting approach based on data characteristics.",

  "Two-pointer technique on arrays was introduced as an efficient approach to solve problems involving pairs and subarrays without nested loops. The technique involves placing two pointers at different positions in the array and moving them toward or away from each other based on conditions. The two-sum problem on a sorted array was solved using opposite-end pointers and compared with the brute force O(n²) approach to demonstrate the O(n) efficiency improvement. The three-sum and four-sum problems were explored as extensions. Container with most water was solved using the greedy movement of the pointer pointing to the shorter height. Removing duplicates from a sorted array in place was implemented using slow and fast pointers. The Dutch National Flag problem for sorting an array of three distinct values was solved using three pointers. Moving zeros to the end of an array without changing the relative order of non-zero elements was implemented. The two-pointer technique is one of the most frequently tested approaches in competitive programming and technical interviews involving arrays.",

  "Sliding window technique on arrays was studied as an efficient method to solve problems involving contiguous subarrays or substrings without redundant recomputation. The fixed-size sliding window was introduced first, where a window of constant size k slides over the array and the result is updated incrementally by adding the new element and removing the outgoing element. Maximum sum subarray of size k was computed using this technique in O(n) time compared to O(n*k) brute force. The variable-size sliding window was then introduced for problems where the window size is not fixed but determined by a condition. The longest subarray with sum equal to k was solved for arrays with non-negative integers. The minimum size subarray with sum greater than or equal to k was implemented with detailed analysis of when to expand and when to shrink the window. The longest substring without repeating characters was solved using the sliding window with a HashSet to track characters. These problems demonstrated how the sliding window avoids redundant work by reusing partial results from previous windows.",

  "Prefix sum arrays were introduced as a preprocessing technique that enables O(1) range sum queries after O(n) preprocessing time. The construction of a prefix sum array where each element stores the cumulative sum from the start of the array was practiced. Range sum queries between index l and r were computed in constant time using the formula prefixSum[r] - prefixSum[l-1]. The concept was extended to 2D prefix sum matrices for computing submatrix sums efficiently. The difference array technique was introduced as an inverse of prefix sums used to perform range update operations in O(1) and query in O(n). Programs were written to solve problems such as finding the number of subarrays with a given sum, equilibrium index, and range-based data analysis using prefix sums. The applications of prefix sums in image processing, competitive programming, and database analytics were discussed. These techniques are foundational tools that appear in a wide range of intermediate and advanced array problems.",

  "Kadane's algorithm was studied as the optimal solution to the maximum subarray sum problem, a classic dynamic programming problem on arrays. The brute force O(n³) approach using three nested loops was first analyzed, followed by the O(n²) approach using two loops with cumulative sums. Kadane's algorithm was then presented as an O(n) linear time solution that maintains a running maximum sum ending at each position and updates the global maximum. The algorithm was implemented and traced through several examples including arrays with all negative numbers, a single element, and mixed positive and negative values. Extensions of the algorithm were practiced including returning the actual subarray indices rather than just the sum, and solving the circular maximum subarray problem where the array wraps around. The maximum product subarray problem was introduced as a variation requiring tracking both the maximum and minimum products due to negative number behavior. These problems are commonly encountered in technical interviews and demonstrate the power of maintaining running state while traversing an array.",

  "Array rotation and rearrangement problems were studied as a category of in-place manipulation exercises. Left rotation and right rotation of an array by k positions were implemented using the three-reversal algorithm which rotates an array in O(n) time and O(1) space. The naive approach using extra space was first implemented before the reversal technique was introduced as the optimal solution. The problem of rotating a matrix by 90 degrees clockwise and counterclockwise was solved using transpose and reverse operations on a 2D array. Rearranging array elements such that positive and negative numbers alternate was solved using the two-pointer technique. The next permutation algorithm that finds the lexicographically next arrangement of array elements was implemented by identifying the rightmost inversion point. Wave array arrangement where elements alternate between higher and lower values was solved with a single pass swap. Merging two sorted arrays in place without extra space was implemented using a gap-based approach. These problems strengthen understanding of in-place manipulation strategies.",

  "Matrix problems as extensions of two-dimensional arrays were studied comprehensively. Matrix traversal patterns including row-by-row, column-by-column, diagonal traversal, and spiral order traversal were implemented. The spiral matrix traversal was solved by maintaining four boundary pointers and moving them inward after each directional pass. Searching in a row-wise and column-wise sorted matrix was solved in O(m + n) time by starting from the top-right corner and eliminating a row or column at each step. Matrix multiplication was implemented with O(n³) complexity and optimized using Strassen's algorithm conceptually. The transpose of a matrix was computed in place by swapping elements across the diagonal. Rotating a matrix 90 degrees clockwise was implemented as transpose followed by row reversal. The set matrix zeroes problem requiring zeroing out entire rows and columns when a zero is found was solved in O(1) space using the first row and column as markers. These matrix problems are frequently asked in technical interviews and develop spatial reasoning and indexing skills.",

  // ─── J2EE (Days 51–78) ──────────────────────────────────────────────────────

  "Introduction to Java EE platform was provided, explaining how Java 2 Enterprise Edition extends the standard Java SE platform with APIs and services for building multi-tier, distributed enterprise applications. The Java EE architecture was explained in terms of client tier, web tier, and enterprise tier with descriptions of the components that belong to each layer. Application servers such as Apache Tomcat, GlassFish, and WildFly were introduced as the runtime containers for deploying J2EE applications. The concept of managed components where the container controls the lifecycle of components like servlets, EJBs, and CDI beans was explained. The Java EE specifications that define APIs including Servlet, JSP, JSTL, JSF, JPA, JMS, EJB, CDI, and JAX-RS were listed with brief descriptions. The role of deployment descriptors in configuring application behavior within the server container was discussed. The advantages of using a standardized enterprise platform including portability, built-in security, transaction management, and scalability were highlighted as reasons why Java EE remains a relevant enterprise technology.",

  "Servlet technology was introduced as the foundational Java EE technology for handling HTTP requests and generating dynamic web responses. The role of the Servlet as a server-side component that receives requests from clients, processes them, and returns responses was explained within the web tier architecture. The Servlet interface and its lifecycle methods including init, service, destroy were explained in detail showing how the container manages servlet instances. The HttpServlet class was used as the base class for web servlets and its doGet, doPost, doPut, and doDelete methods were overridden to handle specific HTTP methods. The HttpServletRequest object was used to read request parameters, headers, cookies, and request body data. The HttpServletResponse object was used to set response status codes, content type headers, and write HTML or JSON content to the output stream. The web.xml deployment descriptor was used to configure servlet mappings and initialization parameters. Annotation-based servlet configuration using @WebServlet was practiced as the modern alternative to XML-based configuration.",

  "The Servlet session management and request dispatching mechanisms were studied to understand how state is maintained across multiple HTTP requests. HTTP was discussed as a stateless protocol, making session management a critical responsibility of web applications. Cookies were introduced as small pieces of data stored on the client browser that are sent with every request to the server to maintain session identity. The HttpSession API was used to create and manage server-side sessions that store user-specific data between requests. Session attributes were set and retrieved using setAttribute and getAttribute methods. Session timeout configuration and manual invalidation were practiced for security purposes. URL rewriting as a fallback session tracking mechanism was explained. The RequestDispatcher was used to forward requests to another servlet or JSP and to include content from another resource in the response. Redirect versus forward was distinguished in terms of the HTTP round-trip involved. These session management techniques form the basis for login systems and user-specific web application functionality.",

  "JavaServer Pages technology was introduced as a server-side template technology that allows HTML and Java code to be mixed in the same file for generating dynamic web content. JSP was explained as a higher-level abstraction over Servlets where the JSP engine automatically translates a JSP page into a Servlet class. JSP scripting elements including scriptlets for Java code blocks, expressions for inline value output, and declarations for method and variable definitions were practiced. JSP implicit objects including request, response, session, application, out, page, pageContext, config, and exception were introduced as pre-configured variables available in every JSP. JSP directives including page, include, and taglib were explained for configuring page properties, including file content, and importing tag libraries. The include directive for static inclusion and jsp:include action for dynamic inclusion were distinguished. A multi-page web application was built using servlets and JSPs following the MVC design pattern where servlets handle control logic and JSPs handle presentation.",

  "JavaServer Pages Standard Tag Library was studied as a collection of custom JSP tags that replace scriptlet code with cleaner, declarative markup. The four JSTL tag libraries including core, formatting, SQL, and XML were introduced with the core library explored in most depth. The c:if and c:choose tags were used for conditional rendering of content. The c:forEach tag was used to iterate over collections and arrays to generate dynamic table rows. The c:url tag was used for URL encoding and building query strings. The c:import tag was used to include content from external resources. The fmt:formatDate and fmt:formatNumber tags were used to format date and numeric values for display. Expression Language syntax using ${} notation was studied as a cleaner alternative to scriptlet expressions for accessing scoped variables, request parameters, and bean properties. Unified EL features including method invocations and collection operations introduced in EL 3.0 were also briefly covered. JSTL and EL together enable clean separation of presentation logic from Java business logic in JSP-based web applications.",

  "JavaBeans and the Model-View-Controller design pattern in Java EE were studied to understand how to structure web applications for maintainability. A JavaBean was defined as a reusable Java class following conventions of a no-argument constructor, private fields, and public getter and setter methods conforming to naming conventions. The jsp:useBean, jsp:getProperty, and jsp:setProperty actions were used to integrate JavaBeans into JSP pages. The MVC pattern was explained as dividing application responsibilities into the Model representing data and business logic, the View responsible for presentation, and the Controller handling request routing and model updates. The Front Controller pattern using a single servlet as the entry point for all requests was implemented as a more organized alternative to multiple servlet mappings. A complete CRUD web application was built using this architecture with servlets as controllers, JSPs as views, and plain Java objects as models. This separation of concerns makes the codebase easier to maintain, test, and extend as the application grows.",

  "Enterprise JavaBeans were introduced as server-managed components designed for building scalable, transactional, and distributed business logic in J2EE applications. The three types of EJBs were explained including stateless session beans that handle requests without maintaining state between calls, stateful session beans that maintain conversational state with a specific client across multiple method calls, and message-driven beans that asynchronously process messages from a queue. EJB lifecycle management was explained showing how the container controls bean creation, passivation, activation, and destruction. Local and remote interfaces were discussed to support both in-JVM and cross-JVM EJB invocations. The @Stateless, @Stateful, and @MessageDriven annotations were used to define EJB components. Dependency injection of EJBs using @EJB annotation was practiced. The container-managed transaction support in EJBs was explained through TransactionAttribute types such as REQUIRED, REQUIRES_NEW, SUPPORTS, and NOT_SUPPORTED. These container services make EJBs a powerful foundation for building enterprise business logic layers.",

  "Java Persistence API was introduced as the standard J2EE specification for object-relational mapping that bridges the gap between Java objects and relational database tables. The core concept of an entity as a lightweight persistent Java class mapped to a database table was explained. Entity classes were created using the @Entity, @Table, @Id, @GeneratedValue, @Column, and @OneToMany annotations to define the mapping between class fields and table columns. The EntityManager and EntityManagerFactory were studied as the JPA core interfaces for performing persistence operations. CRUD operations using persist, merge, remove, and find methods were practiced. JPQL, the object-oriented query language of JPA, was introduced as a way to query entities using class and attribute names rather than table and column names. Named queries using @NamedQuery were defined on entity classes for reusable query definitions. The three inheritance mapping strategies in JPA including SINGLE_TABLE, TABLE_PER_CLASS, and JOINED were explained with examples showing the SQL structure each strategy produces.",

  "JPA relationships and cascade operations were explored to understand how entity associations map to foreign key relationships in the database. One-to-one relationships were mapped using @OneToOne and the shared primary key and foreign key strategies were both practiced. One-to-many and many-to-one bidirectional relationships were mapped using @OneToMany and @ManyToOne with the mappedBy attribute to indicate the owning side. Many-to-many relationships were mapped using @ManyToMany with an automatically generated join table. Fetch types including LAZY and EAGER were explained and their performance implications discussed, with LAZY loading being preferred for collection relationships to avoid unnecessary data loading. Cascade types including ALL, PERSIST, MERGE, REMOVE, and REFRESH were configured to control how persistence operations propagate from parent to child entities. The orphanRemoval attribute was used to automatically delete orphaned child entities. The N+1 query problem as a common JPA performance pitfall was identified and addressed using JOIN FETCH in JPQL queries.",

  "Java Message Service was introduced as the J2EE API for asynchronous, loosely-coupled communication between application components using messages. The concept of asynchronous messaging was explained as an alternative to synchronous method calls for decoupling producers and consumers, improving resilience and scalability. The two messaging models in JMS including point-to-point using queues and publish-subscribe using topics were explained with use case comparisons. A JMS queue was set up in an application server and a message producer was written to create a ConnectionFactory, create a Connection and Session, and send TextMessages to the queue. A message consumer was written using both synchronous receive and asynchronous MessageListener implementations. Message-driven beans were used as the preferred J2EE way to process JMS messages asynchronously within the container. JMS message properties and selectors were explained for filtering messages at the broker level. The integration of JMS with transactions to ensure messages are only consumed when the transaction commits was also discussed.",

  "Java Naming and Directory Interface was introduced as the J2EE API that provides a unified interface for looking up objects and resources registered in a naming service. JNDI was explained as the mechanism through which J2EE components look up shared resources such as DataSources, JMS connection factories, EJBs, and environment entries without hard-coding resource coordinates. The InitialContext class was used to perform JNDI lookups by specifying the bound name of a resource. Resource references in web.xml using resource-ref elements were configured to declare dependencies that the container binds at deployment time. The @Resource annotation was introduced as a modern alternative to programmatic JNDI lookups for injecting resources like DataSources and JMS factories into managed components. Connection pooling through a JNDI-registered DataSource was demonstrated as the preferred way for web applications to obtain database connections efficiently. The java:comp/env naming context was explained as the private component namespace for resource references. JNDI forms the backbone of J2EE resource management and service discovery.",

  "Java Authentication and Authorization Service and J2EE security mechanisms were studied to understand how enterprise applications protect resources from unauthorized access. Declarative security was introduced as the preferred approach where security constraints are configured in deployment descriptors or annotations rather than coded in application logic. Web resource security constraints were configured in web.xml using security-constraint, web-resource-collection, and auth-constraint elements to restrict URL patterns to specific user roles. Login configuration using form-based authentication was set up with a custom login page and error page. Container-managed authentication was explained as the approach where the application server handles credential verification against a configured security realm. Programmatic security using HttpServletRequest methods such as isUserInRole, getUserPrincipal, and login was also demonstrated for fine-grained access control within application logic. Role-based access control using @RolesAllowed, @PermitAll, and @DenyAll annotations on EJB methods was practiced. HTTPS and transport-level security configuration in the server were briefly discussed.",

  "Context and Dependency Injection for Java EE was studied as the modern, type-safe dependency injection framework that replaces manual JNDI lookups and factory patterns. CDI was explained as a Java EE specification that manages the lifecycle of injectable beans and provides a powerful event and interceptor system. The @Inject annotation was used to inject managed beans, EJBs, and resources into any Java EE component without lookup code. CDI bean scopes including @RequestScoped, @SessionScoped, @ApplicationScoped, @ConversationScoped, and @Dependent were explained with their lifecycle boundaries and appropriate use cases. Producer methods and fields using @Produces were introduced for creating beans whose construction requires custom logic. The @Qualifier annotation was used to distinguish between multiple beans of the same type for injection disambiguation. CDI events were used to implement the observer pattern through @Observes, enabling loose coupling between application components. Interceptors using @AroundInvoke were written for cross-cutting concerns like logging and performance monitoring.",

  "JAX-RS was introduced as the Java EE specification for building RESTful web services using annotations on plain Java classes. REST architectural principles including statelessness, resource identification through URIs, and uniform interface using HTTP methods were reviewed in context. A JAX-RS application class extending Application was configured as the entry point for the REST API. Resource classes were annotated with @Path, @GET, @POST, @PUT, @DELETE, and @PATCH to define REST endpoints. Path parameters and query parameters were read using @PathParam and @QueryParam annotations. The @Produces and @Consumes annotations were used to specify the media types supported by each endpoint for content negotiation. JSON serialization and deserialization were handled automatically by JAX-RS with a JSON provider such as Jackson or MOXy. Response building using the Response class was practiced to set status codes, headers, and entity body. Exception mapping using ExceptionMapper was implemented to return structured error responses. A complete REST API for a resource such as products or employees was built end-to-end.",

  "JAX-WS was studied as the Java EE technology for building SOAP-based web services. The differences between REST and SOAP web services were discussed in terms of protocol, message format, interface definition, and use cases. A SOAP web service endpoint was created using a plain Java class annotated with @WebService and @WebMethod. The WSDL document generated automatically by the container was examined to understand its structure including portType, binding, service, and message elements. XSD data types in WSDL were mapped to Java types through JAXB marshalling and unmarshalling. A web service client was generated from the WSDL using the wsimport tool and used to call the service methods as regular Java method calls. WS-Security concepts including authentication, message integrity, and message confidentiality were briefly introduced. The @WebServiceRef annotation was used to inject web service proxies into Java EE components. MTOM for efficient binary data transmission in SOAP messages was also mentioned. Understanding both REST and SOAP prepares developers to work with the diverse web service ecosystems encountered in enterprise integration projects.",

  "Java EE design patterns were studied to understand proven architectural solutions to recurring problems in enterprise application design. The Data Access Object pattern was implemented to abstract and encapsulate all database access logic behind an interface, separating persistence concerns from business logic. The Service Locator pattern was explained as a way to cache JNDI lookups for performance, though it was noted that CDI injection is preferred in modern applications. The Transfer Object pattern was used to encapsulate data passed between tiers to reduce the number of remote method calls. The Business Delegate pattern was used to decouple the presentation tier from business services. The Session Facade pattern was implemented using a stateless EJB that provides a coarse-grained interface to a group of fine-grained business objects. The Composite Entity pattern was used to manage the graph of related persistent objects as a single coarse-grained entity. The Front Controller and Application Controller patterns were studied for centralizing request routing and application flow in web applications. Knowing these patterns allows developers to communicate design intent clearly and build systems that are maintainable and extensible.",

  "Java EE application testing and quality assurance practices were studied to understand how enterprise applications are validated. Unit testing of business logic using JUnit 5 was practiced with examples testing service and DAO layer logic in isolation. Mockito was introduced as a mocking framework to simulate dependencies such as databases and external services during unit testing. Integration testing of web layers using Arquillian was briefly introduced as a framework that deploys test components into a real or embedded application server for in-container testing. REST API testing using REST-assured was practiced to send HTTP requests to endpoints and assert response status, headers, and body content. Database integration testing using an in-memory H2 database configured as a test data source was demonstrated to isolate tests from production data. Test-driven development principles were discussed as an approach to write test cases before implementation code. Code quality tools including SonarLint for static analysis were introduced. A proper testing strategy covering unit, integration, and end-to-end testing ensures that J2EE applications are reliable, regression-free, and maintainable.",

  "Deployment and packaging of Java EE applications was studied to understand how enterprise applications are assembled and deployed to production environments. The WAR file format for web applications was explained as a ZIP archive containing the WEB-INF directory with web.xml, compiled class files, JSPs, and static resources. The EAR file format for enterprise applications was explained as a container for multiple modules including WAR files, JAR files containing EJBs, and application.xml descriptor. The Maven build tool was used to manage project dependencies, compile sources, run tests, and package applications into WAR and EAR artifacts using standard lifecycle phases. The pom.xml file was examined in detail to understand dependency scopes, plugin configuration, and profile-based build customization. Deployment to Apache Tomcat was demonstrated both through the Tomcat Manager web interface and by copying the WAR file to the webapps directory. Environment-specific configuration using JNDI resource definitions in server.xml and context.xml was practiced. Continuous integration using Jenkins to automate build and deployment pipelines was briefly introduced as the industry standard for enterprise deployment workflows.",

  "JavaServer Faces was introduced as the Java EE component-based web framework for building user interface views in enterprise applications. JSF was explained as a higher-level framework compared to raw Servlets and JSPs that provides a component model, event handling, navigation rules, and built-in integration with CDI. The FacesServlet was configured as the central front controller that processes all JSF requests. Facelets was studied as the default templating system for JSF replacing JSP, allowing the creation of reusable page templates using ui:composition, ui:define, and ui:insert tags. Standard JSF HTML component library tags including h:inputText, h:outputLabel, h:commandButton, h:dataTable, and h:messages were used to build form-based user interfaces. Managed beans annotated with @Named and @RequestScoped served as backing beans holding page data and handling user actions through action methods. Navigation rules using implicit navigation and explicit outcome strings were practiced to control page flow between views. Form validation using built-in validators and custom validators was implemented with error messages displayed using h:message tags.",

  "JPA Criteria API was studied as a type-safe programmatic alternative to JPQL for building dynamic queries in enterprise applications. The motivation for Criteria API was explained as the ability to construct queries based on runtime conditions without string concatenation vulnerabilities and with full compile-time type checking. The CriteriaBuilder was obtained from the EntityManager and used to create CriteriaQuery objects targeting specific entity types. Root was defined as the starting point for navigation through entity attributes using the get method. Predicates representing WHERE conditions were built using CriteriaBuilder methods such as equal, like, greaterThan, between, and conjunction for AND grouping. Dynamic query construction was practiced by conditionally adding predicates based on which filter criteria are present in a search form submission. The TypedQuery was created from the CriteriaQuery and used to execute the query and retrieve results. Ordering results using CriteriaBuilder.asc and CriteriaBuilder.desc was demonstrated. Count queries and aggregate queries using Criteria API were built for pagination and summary statistics. The Criteria API is indispensable for building flexible search and reporting features in enterprise applications.",

  "Interceptors and decorators in Java EE CDI were explored as powerful mechanisms for implementing cross-cutting concerns without modifying business logic classes. Interceptors were explained as objects that interpose on method invocations, allowing behavior such as logging, security checks, performance measurement, and transaction demarcation to be implemented separately from business code. A custom interceptor binding annotation was created using @InterceptorBinding and applied to target classes and methods. The interceptor class was implemented with an @AroundInvoke method that receives the InvocationContext and can proceed with or abort the original method call. Interceptors were enabled globally in beans.xml for application-wide application. Decorators were introduced as a CDI-specific construct similar to interceptors but aware of the bean's type, allowing them to call the original bean methods selectively. The @Decorator annotation and @Delegate injection were used to implement a logging decorator that wraps a service interface. The difference between interceptors for generic cross-cutting behavior and decorators for business-aware wrapping was clarified with examples.",

  "Java EE concurrency utilities were studied as the managed threading APIs that allow enterprise applications to run asynchronous tasks within the container's managed environment. Unmanaged threads created directly using the Thread class or Executors were explained as problematic in J2EE because they operate outside container control, losing access to security context, transaction context, and JNDI namespace. ManagedExecutorService was introduced as the J2EE-compliant thread pool that propagates container context to submitted tasks. ManagedScheduledExecutorService was used for periodic and delayed task scheduling within the managed environment. ContextService was explained as the mechanism for capturing the container context and propagating it to asynchronous tasks. The @Asynchronous annotation on EJB methods was demonstrated as a simpler alternative for making EJB method calls non-blocking, returning a Future for result retrieval. ManagedThreadFactory was introduced for creating individual managed threads when fine-grained thread control is needed. These concurrency utilities enable enterprise applications to leverage parallel processing while remaining fully integrated with J2EE container services.",

  "WebSocket support in Java EE was introduced as a technology for enabling full-duplex, bidirectional communication between clients and servers over a persistent connection. WebSocket was contrasted with HTTP request-response communication to explain the advantages of persistent connections for real-time applications such as chat systems, live dashboards, and collaborative tools. The @ServerEndpoint annotation was used on a plain Java class to define a WebSocket server endpoint at a specified URI path. Lifecycle callback annotations including @OnOpen, @OnMessage, @OnClose, and @OnError were implemented to handle connection events and incoming messages. The Session object was used to identify individual client connections and send messages back to specific clients or broadcast to all connected sessions. The encoders and decoders mechanism was configured to automatically convert Java objects to and from JSON or text formats for WebSocket messages. A simple real-time notification system and a group chat application were implemented to demonstrate bidirectional communication. The integration of WebSocket endpoints with CDI beans for accessing application state was also demonstrated.",

  "Java EE batch processing was introduced using the Batch Applications for Java Platform specification as a framework for executing long-running, non-interactive bulk data processing jobs. Batch processing was explained as suitable for tasks such as data migration, report generation, end-of-day processing, and bulk file imports that process large volumes of records without user interaction. The job XML descriptor was written to define the job structure including steps, decision elements, and flow between steps. Chunk-oriented processing was implemented with a reader component reading items from a source, a processor transforming each item, and a writer persisting processed items in configurable chunks within a transaction. Batchlet processing was implemented for task-oriented steps that execute a single unit of work rather than item-by-item processing. Job operators were used to start, stop, restart, and monitor batch job executions. Checkpoint mechanisms for restartability after failure were configured to avoid reprocessing already committed chunks. Job parameters were passed at submission time to configure job behavior. Batch processing is an essential enterprise capability for handling large-scale data operations reliably.",

  "Java EE performance tuning and monitoring practices were studied to understand how enterprise applications are optimized for production workloads. JPA query performance was analyzed using the slow query log in MySQL and EXPLAIN plans to identify missing indexes and inefficient joins. Second-level caching in JPA using EhCache was configured with @Cacheable on entity classes to reduce repetitive database round trips for frequently read reference data. Connection pool sizing and configuration parameters including maximum pool size, minimum idle connections, and connection timeout were tuned based on expected concurrent load. EJB pool configurations for stateless session beans were adjusted to balance resource usage and throughput. HTTP session size and replication overhead in clustered deployments were discussed as factors affecting horizontal scalability. Application profiling using VisualVM was demonstrated to identify memory leaks, thread contention, and CPU hotspots. GC tuning parameters and heap sizing strategies for the JVM were briefly introduced. Monitoring using JMX MBeans to expose runtime application metrics was demonstrated. These performance engineering practices are essential for ensuring that Java EE applications meet the non-functional requirements of production enterprise environments.",

  "A complete Java EE project was designed and implemented as the capstone exercise bringing together all the technologies studied during the internship. The project was a web-based employee management system featuring user authentication, CRUD operations for employee records, department management, and role-based access control. The architecture followed the MVC pattern with JSF-based frontend views, CDI-managed backing beans as controllers, EJB service beans for business logic, JPA entities and repositories for data persistence, and a MySQL database. A RESTful API layer built with JAX-RS was added to expose employee data for potential integration with mobile or third-party clients. The system was secured using form-based authentication with J2EE declarative security constraints restricting access by role. The application was packaged as an EAR file using Maven and deployed to WildFly application server. JUnit and Mockito tests were written for the service layer. This project synthesized the complete J2EE technology stack and provided practical experience in building a real-world enterprise Java application from requirements through deployment."

];




const outcomes = [

  "The outcome of the introductory session was a clear understanding of the internship roadmap, the learning environment, and the purpose of studying each topic in sequence. It helped build awareness of how Java-based development connects with web technologies, databases, and enterprise applications. The session also created confidence in following the training flow in a disciplined way. A stronger mindset was developed for learning technical topics step by step. Overall, it gave a strong foundation for the full internship journey.",

  "The outcome of learning Java programming basics was the ability to understand the syntax, structure, and execution flow of a Java program. It improved awareness of how classes, the main method, compilation, and execution work together. The session also made it easier to write and run simple programs independently. This created confidence in using Java as a programming language for future topics. Overall, the basics of Java became clear and practical.",

  "The outcome of studying variables, identifiers, and data types was a stronger understanding of how data is stored and represented in Java. It became easier to select the correct data type for different kinds of values. The difference between primitive and non-primitive types was understood properly. This improved coding accuracy and reduced confusion while writing programs. Overall, the session strengthened the foundation of memory and data handling in Java.",

  "The outcome of learning operators and expressions was the ability to perform calculations and decision-based logic correctly in Java programs. Arithmetic, relational, logical, and assignment operators became easier to use in practical coding. The session also improved understanding of expression evaluation and operator precedence. This helped in writing more accurate and meaningful program logic. Overall, it made basic computation and condition checking much stronger.",

  "The outcome of studying conditional statements was better control over program flow based on different input values and conditions. The use of if, else, else-if, and switch became clearer through practice examples. It became easier to design programs that respond differently depending on the situation. This improved problem-solving and logical thinking. Overall, the session helped in building decision-making logic inside Java programs.",

  "The outcome of learning loops was the ability to repeat tasks efficiently without writing the same code again and again. The differences between for, while, and do-while loops became clear through examples. It became easier to solve repeated calculations and printing tasks. The session also improved control over break and continue statements. Overall, it strengthened repetitive logic handling in Java.",

  "The outcome of pattern printing practice was improved logical thinking and better understanding of nested loops. It became easier to break a visual shape into rows, columns, and conditions. Star and number patterns helped in building step-by-step problem-solving habits. The session also improved patience and observation while tracing output. Overall, it made loop-based logic much stronger.",

  "The outcome of practicing number-based programs was a better grasp of digit manipulation and mathematical logic. Reverse number, palindrome, digit sum, and digit counting programs became easier to understand and write. The session improved the use of modulus and division operations in coding. It also helped in developing the habit of solving problems step by step. Overall, it strengthened numeric reasoning in Java.",

  "The outcome of learning arrays was the ability to store and manage multiple values in a single structure. It became easier to access, update, and traverse elements using indexes. The session also improved understanding of searching, maximum, minimum, and sum operations on arrays. This built confidence in handling structured data in Java. Overall, it gave a strong base for future problem-solving topics.",

  "The outcome of studying methods was the ability to write reusable and organized code blocks. It became easier to divide a problem into smaller parts and solve them neatly. The session improved understanding of parameters, return values, and method calls. This also made the code cleaner and easier to maintain. Overall, it strengthened modular programming skill.",

  "The outcome of learning classes and objects was a clear understanding of object-oriented programming structure. It became easier to model real-world entities using classes and create their instances as objects. The session improved the understanding of fields, methods, and object interaction. This made Java feel more practical and system-oriented. Overall, it established a strong object-oriented foundation.",

  "The outcome of studying constructors was a better understanding of object initialization in Java. It became clear how values are assigned automatically when objects are created. The session also improved understanding of default and parameterized constructors. Constructor overloading gave more flexibility in object creation. Overall, it made the object initialization process clear and useful.",

  "The outcome of learning the this keyword was better clarity in handling current object references inside a class. It became easier to resolve confusion between instance variables and parameters. The session also improved understanding of method and constructor behavior. This helped in writing cleaner and more readable class code. Overall, it strengthened object-level programming understanding.",

  "The outcome of learning static members was understanding how class-level variables and methods work in Java. It became clear how static members are shared by all objects instead of belonging to one object only. The session improved memory and design awareness while coding. It also helped in recognizing when a static method is more suitable. Overall, it added an important concept to core Java knowledge.",

  "The outcome of studying access modifiers was better control over data visibility and class security. It became easier to understand public, private, protected, and default access levels. The session improved the use of encapsulation in programming. Getter and setter methods made class design more structured. Overall, it helped in writing safer and more maintainable Java programs.",

  "The outcome of learning packages was a better understanding of project organization and class grouping. It became easier to manage related files in a structured way. The session also helped in avoiding name conflicts and improving readability in large projects. Import statements became clearer and more meaningful. Overall, it strengthened code organization skills.",

  "The outcome of studying inheritance was a clear understanding of code reuse and class hierarchy. It became easier to build child classes from parent classes and extend existing behavior. The session also improved understanding of the extends keyword and super keyword. This made object-oriented design more powerful and practical. Overall, it added one of the most important concepts in Java.",

  "The outcome of learning method overriding was a better understanding of runtime behavior and child class customization. It became clearer how the same method can behave differently in a subclass. The session improved understanding of polymorphism through real examples. It also helped in comparing overriding with overloading. Overall, it made inheritance more practical and flexible.",

  "The outcome of studying polymorphism was a stronger understanding of how one action can take many forms in Java. It became easier to see the difference between compile-time and runtime behavior. The session also connected overloading and overriding with object-oriented design. This improved flexibility in program structure. Overall, it deepened knowledge of advanced OOP concepts.",

  "The outcome of learning abstraction and abstract classes was better understanding of hiding unnecessary details and focusing on essential behavior. It became easier to design common templates for child classes. The session improved conceptual thinking in object-oriented programming. It also clarified when abstract classes are useful in real systems. Overall, it strengthened design-oriented Java learning.",

  "The outcome of studying interfaces was a clear understanding of how common behavior can be defined for different classes. It became easier to use the implements keyword and build contract-based programming. The session also improved understanding of abstraction from a different angle. This helped in writing flexible and reusable code. Overall, it completed an important part of OOP learning.",

  "The outcome of learning exception handling was the ability to write safer programs that handle errors properly. It became easier to use try, catch, finally, throw, and throws in real code. The session improved debugging and error recovery skills. It also reduced the fear of unexpected runtime problems. Overall, it made Java programs more reliable.",

  "The outcome of learning custom exceptions was better control over application-specific error situations. It became easier to define and use meaningful exception classes when built-in exceptions were not enough. The session improved understanding of exception flow and propagation. This made the error-handling process more flexible and professional. Overall, it strengthened exception design skills.",

  "The outcome of studying strings was better ability to process and manipulate text in Java. It became easier to use methods like substring, replace, trim, and split in practical situations. The session also improved understanding of string immutability and string builders. This helped in solving many input and formatting problems. Overall, it built strong text-handling confidence.",

  "The outcome of revisiting arrays with more practice was stronger confidence in traversal and searching logic. It became easier to solve array-based problems using loops and conditions. The session also improved speed in finding maximum, minimum, duplicates, and sum values. This reinforced the connection between theory and practical coding. Overall, it made array handling more solid.",

  "The outcome of learning multidimensional arrays was better understanding of row and column-based data storage. It became easier to work with matrix-style programs and nested loops. The session improved visual thinking while handling table-like structures. This also supported future problem-solving with grids and matrices. Overall, it extended array knowledge into more advanced structures.",

  "The outcome of learning the collection framework was the ability to handle groups of objects more flexibly than arrays. It became easier to understand the purpose of List, Set, Queue, and Map. The session improved awareness of dynamic storage and built-in collection support in Java. This made data handling more practical and powerful. Overall, it opened the door to advanced utility programming.",

  "The outcome of studying ArrayList and List was a better understanding of dynamic, ordered storage. It became easier to add, remove, and access values efficiently. The session also improved awareness of how lists differ from arrays. This helped in choosing the right structure for changing data. Overall, it strengthened everyday collection usage in Java.",

  "The outcome of learning LinkedList was understanding how node-based storage works in collections. It became easier to compare linked structure behavior with ArrayList performance. The session improved knowledge of insertion and deletion use cases. This made collection selection more thoughtful. Overall, it added another useful data structure to the Java toolkit.",

  "The outcome of studying Set implementations was the ability to manage unique values without duplicates. It became easier to use HashSet and LinkedHashSet for clean data storage. The session also improved understanding of insertion order and uniqueness. This helped in solving duplication-related problems. Overall, it made collection handling more efficient.",

  "The outcome of learning Map was a stronger understanding of key-value storage in Java. It became easier to store and retrieve values using unique keys. The session also improved practical knowledge of HashMap and LinkedHashMap. This made lookup-based logic much more convenient. Overall, it added an essential structure to collection learning.",

  "The outcome of studying iteration over collections was better control over accessing elements safely and clearly. It became easier to use for-each loops and iterators properly. The session improved understanding of traversal methods and element processing. This made collection programming more flexible. Overall, it strengthened real-world collection usage.",

  "The outcome of learning sorting and searching in collections was better ability to arrange and retrieve data efficiently. It became easier to apply natural ordering and custom ordering when needed. The session also improved understanding of Comparable and Comparator. This helped in handling list data more professionally. Overall, it enhanced collection processing skills.",

  "The outcome of learning multithreading was a clear understanding of how multiple tasks can run at the same time. It became easier to see why concurrent execution improves performance in some applications. The session also improved awareness of thread life cycle and task handling. This gave a new perspective on program execution. Overall, it introduced an important advanced Java concept.",

  "The outcome of practicing thread creation was better understanding of how to build and run independent tasks. It became easier to use both the Thread class and the Runnable interface. The session improved knowledge of start, run, and thread execution flow. This made multithreading more practical and visible. Overall, it strengthened concurrent programming basics.",

  "The outcome of learning synchronization was better control over shared data in multithreaded programs. It became easier to avoid race conditions and inconsistent results. The session also improved understanding of synchronized methods and blocks. This made thread safety more clear and necessary. Overall, it added reliability to concurrent programming.",

  "The outcome of studying inter-thread communication was a clearer understanding of how threads coordinate with each other. It became easier to use wait, notify, and notifyAll in proper flow control. The session improved thinking around producer-consumer style problems. This made multithreading more complete. Overall, it strengthened thread cooperation skills.",

  "The outcome of learning file handling was the ability to read and write data outside the program. It became easier to understand how files are created, processed, and stored. The session also improved knowledge of streams and external data usage. This made Java more practical for real system tasks. Overall, it added a useful file-based skill to core Java.",

  "The outcome of learning MySQL basics was a strong understanding of databases, tables, rows, and columns. It became easier to see how structured data is stored and organized. The session also introduced the role of keys and constraints in data design. This built a strong base for SQL work. Overall, it started the database learning stage clearly.",

  "The outcome of studying SQL SELECT queries was better ability to retrieve and filter data from tables. It became easier to write queries using conditions, sorting, and limits. The session also improved confidence in reading database results correctly. This made database access more practical. Overall, it strengthened the reading side of SQL.",

  "The outcome of practicing insert, update, and delete operations was better control over database data changes. It became easier to add, modify, and remove records properly. The session also improved understanding of safe data modification. This helped in building CRUD logic. Overall, it made database management more complete.",

  "The outcome of learning filtering and sorting in SQL was better ability to work with specific data sets. It became easier to use WHERE, ORDER BY, DISTINCT, and LIMIT effectively. The session also improved logical thinking while writing queries. This made database output more useful and precise. Overall, it strengthened SQL querying skill.",

  "The outcome of learning aggregate functions was better understanding of summary calculations in SQL. It became easier to use COUNT, SUM, AVG, MIN, and MAX for reports. The session also improved awareness of GROUP BY and HAVING. This made analytical query writing much easier. Overall, it added important reporting capability.",

  "The outcome of learning joins was a deeper understanding of combining related data from multiple tables. It became easier to use inner join, left join, right join, and self join correctly. The session also improved understanding of relational database structure. This made SQL much closer to real-world application needs. Overall, it strengthened relational thinking.",

  "The outcome of studying normalization was better understanding of designing clean and efficient database structures. It became easier to recognize redundancy and remove unnecessary duplication. The session also improved knowledge of first, second, and third normal forms. This helped in planning better database layouts. Overall, it improved database design quality.",

  "The outcome of learning keys and constraints was better control over data accuracy and table relationships. It became easier to understand primary key, foreign key, unique, not null, and check constraints. The session also improved database integrity awareness. This made table design more structured and safe. Overall, it strengthened core MySQL design knowledge.",

  "The outcome of learning subqueries and advanced SQL usage was better ability to solve multi-step query problems. It became easier to nest queries and use results from one query inside another. The session also improved logical flow in database problem solving. This made complex data retrieval more practical. Overall, it expanded SQL capability significantly.",

  "The outcome of learning MySQL functions was better skill in handling text, numbers, dates, and conditions inside queries. It became easier to use built-in functions for formatting and calculation. The session also improved practical reporting and transformation ability. This made SQL more flexible and powerful. Overall, it added depth to database querying.",

  "The outcome of learning normalization in more detail was a stronger understanding of how relational tables should be structured. It became easier to avoid update, insert, and delete anomalies. The session also improved awareness of data consistency and integrity. This helped in designing scalable database systems. Overall, it made database planning more professional.",

  "The outcome of learning indexing was better awareness of how database performance can be improved. It became easier to understand how indexes speed up searches in large tables. The session also improved the ability to think about query optimization. This made database efficiency more meaningful. Overall, it strengthened performance-focused database understanding.",

  "The outcome of learning database management features was better awareness of stored procedures, triggers, and views. It became easier to understand how logic can live inside the database layer. The session also improved the ability to think about reusable and automated database tasks. This made MySQL knowledge more advanced. Overall, it completed a useful portion of backend database learning.",

  "The outcome of learning web technology basics was a clear understanding of how browsers, servers, and users interact. It became easier to see how HTML, CSS, and JavaScript work together in web applications. The session also improved awareness of frontend and backend roles. This created a bridge between programming and real user-facing systems. Overall, it started the web technology module effectively.",

  "The outcome of learning HTML was the ability to build the structure of web pages properly. It became easier to use tags for headings, paragraphs, lists, links, images, and forms. The session also improved understanding of page layout and semantic structure. This made web page creation more organized. Overall, it built a strong foundation for frontend work.",

  "The outcome of learning CSS was better ability to style web pages and improve user experience. It became easier to control colors, spacing, borders, and layouts. The session also improved understanding of selectors and styling methods. This made web pages look cleaner and more professional. Overall, it added visual design skill to web development.",

  "The outcome of revisiting JavaScript in web technology was a better understanding of how interactivity is added to webpages. It became easier to use variables, functions, conditions, and loops in frontend logic. The session also improved knowledge of browser-based execution. This made the connection between code and user interaction stronger. Overall, it improved frontend programming confidence.",

  "The outcome of learning DOM concepts was better ability to access and modify webpage elements dynamically. It became easier to change content, styles, and attributes using JavaScript. The session also improved understanding of event-driven behavior. This made webpages more interactive and responsive. Overall, it strengthened practical frontend logic.",

  "The outcome of learning form handling and validation was better control over user input in web applications. It became easier to check data before submission and avoid incorrect entries. The session also improved awareness of user experience and form behavior. This made web forms more reliable. Overall, it added a useful practical skill in frontend development.",

  "The outcome of learning responsive design was better understanding of how websites adapt to different screen sizes. It became easier to think about mobile, tablet, and desktop layouts. The session also improved awareness of usability and flexible presentation. This made web pages more modern and user-friendly. Overall, it strengthened design thinking in web technology.",

  "The outcome of learning backend communication in web applications was a clearer understanding of how data moves between client and server. It became easier to connect frontend behavior with backend services. The session also improved awareness of APIs and JSON format. This made full-stack logic easier to understand. Overall, it connected frontend and backend concepts well.",

  "The outcome of learning HTTP methods and request-response flow was better understanding of how web communication works. It became easier to recognize the role of GET, POST, PUT, and DELETE. The session also improved awareness of how data is exchanged between systems. This made backend interaction more meaningful. Overall, it supported real application understanding.",

  "The outcome of revising web technology topics was a more complete understanding of how HTML, CSS, JavaScript, and communication flow work together. It became easier to see the full frontend structure in one connected way. The session also improved memory and confidence in the topic. This created readiness for deeper backend work. Overall, it completed the planned web technology coverage.",

  "The outcome of starting DSA was a new way of thinking about coding through structured problem solving. It became easier to understand why data structures and algorithms matter in interviews and real programming. The session also introduced arrays as the first important topic. This made the move from basic coding to analytical coding smoother. Overall, it started algorithmic thinking properly.",

  "The outcome of studying array traversal in DSA was better control over scanning and processing values one by one. It became easier to solve sum, maximum, minimum, and search-based problems. The session also improved attention to indexing and loop behavior. This made array logic more accurate. Overall, it strengthened the core of array problem solving.",

  "The outcome of practicing array manipulation was better ability to update, reverse, and shift values inside an array. It became easier to think in steps instead of jumping to a solution quickly. The session also improved logic tracing and code clarity. This made array operations more practical. Overall, it added confidence in handling in-place changes.",

  "The outcome of learning search problems in arrays was a better understanding of finding values efficiently. It became easier to use linear search and understand when it is useful. The session also improved the habit of checking conditions carefully. This made problem solving more organized. Overall, it strengthened the search side of DSA arrays.",

  "The outcome of learning sorting basics was better understanding of how data can be arranged in order. It became easier to compare elements and understand the swapping process. The session also improved awareness of why sorting helps in later problems. This made algorithmic thinking more structured. Overall, it added an important foundation to DSA.",

  "The outcome of learning time complexity was a stronger understanding of how to judge the efficiency of code. It became easier to compare faster and slower solutions based on input size. The session also improved awareness of Big O notation and performance thinking. This made problem solving smarter. Overall, it added an important analytical skill.",

  "The outcome of learning recursion was a better understanding of self-calling functions and stepwise breakdown of problems. It became easier to identify the base case and recursion flow. The session also improved mathematical thinking in coding. This made some problems easier to solve in a new way. Overall, it expanded problem-solving style.",

  "The outcome of continuing pattern printing was stronger confidence in nested loop logic and visual output reasoning. It became easier to create star and number patterns by observing row and column behavior. The session also improved patience and accuracy while coding. This made loop logic more stable. Overall, it reinforced pattern-based practice well.",

  "The outcome of learning number patterns was better ability to control values while printing structured outputs. It became easier to manage counters and sequence logic. The session also improved understanding of loop-based arithmetic patterns. This made number reasoning stronger. Overall, it supported logical output formation.",

  "The outcome of practicing digit-based number problems again was a deeper understanding of number manipulation techniques. It became easier to reverse numbers, count digits, and work with palindrome and Armstrong-type logic. The session also improved use of arithmetic operations in small problems. This made numeric problem solving more confident. Overall, it strengthened number logic properly.",

  "The outcome of mixed logic exercises was the ability to combine arrays, numbers, and patterns in one problem-solving flow. It became easier to think about multiple concepts together rather than separately. The session also improved planning before coding. This made problem solving more complete. Overall, it connected many earlier topics in a practical way.",

  "The outcome of revising array-based DSA was stronger retention of all the important array concepts learned earlier. It became easier to solve traversal, searching, updating, and basic sorting problems. The session also improved confidence before moving to higher topics. This acted like a checkpoint in the learning journey. Overall, it completed the array portion well.",

  "The outcome of introducing J2EE was a clear understanding of how Java is used in enterprise-level applications. It became easier to see how server-side systems are built for business use. The session also connected core Java knowledge with backend development. This made the learning path more industry-oriented. Overall, it began the enterprise Java phase effectively.",

  "The outcome of learning servlets was a better understanding of server-side request handling in web applications. It became easier to see how requests enter the server and how responses are returned. The session also improved awareness of the servlet life cycle. This made backend flow more visible and practical. Overall, it strengthened Java web fundamentals.",

  "The outcome of learning JSP was a better understanding of dynamic page generation on the server side. It became easier to combine Java logic with HTML output when needed. The session also improved knowledge of presentation-layer processing. This made web development with Java more complete. Overall, it added a useful J2EE web layer skill.",

  "The outcome of learning JDBC was the ability to connect Java applications with MySQL databases. It became easier to use connections, statements, and result sets for data operations. The session also improved understanding of CRUD interaction from Java. This made backend integration more practical. Overall, it connected Java and database work clearly.",

  "The outcome of learning CRUD operations in J2EE was better understanding of how applications manage data from start to finish. It became easier to create, read, update, and delete records through backend logic. The session also improved the connection between servlets, JDBC, and MySQL. This made the full backend flow meaningful. Overall, it strengthened application development knowledge.",

  "The outcome of learning session handling was better understanding of how user state is maintained across multiple requests. It became easier to use cookies and sessions for login and personalized behavior. The session also improved awareness of request dispatching and navigation. This made web applications feel more dynamic. Overall, it added an important enterprise web concept.",

  "The outcome of reviewing all completed topics was a more connected understanding of the full learning path from basics to advanced modules. It became easier to see how Java, collections, multithreading, MySQL, web technology, DSA arrays, and J2EE fit together. The session also improved confidence in the overall syllabus coverage. This made the learning journey feel complete and organized. Overall, it helped in seeing the full progress clearly.",

  "The outcome of the final consolidation was a strong summary of everything learned during the internship journey. It became easier to remember how each topic supports the next one in real development work. The session also improved readiness for project building, revision, and further practice. This gave a complete sense of progress from basic programming to enterprise Java. Overall, it completed the full 78-row outcome set in a structured way."
];

// const outcomes = [
//   "Ability to work with JavaScript array methods and string methods to manipulate data effectively",
//   "Understanding the difference between var, let and const and how variable scope works in JavaScript",
//   "Knowledge of arrow functions and normal functions and understanding their differences and use cases",
//   "Improved logical thinking and problem solving ability through practice problems in JavaScript",
//   "Strong foundation in Java programming including primitive and non primitive data types",
//   "Understanding of different types of variables in Java such as instance variables, static variables and local variables",
//   "Knowledge about JVM memory management including heap area, stack area and method area",
//   "Understanding object initialization using constructors and the purpose of constructors in Java",
//   "Ability to implement constructor overloading and understand different types of constructors",
//   "Clear understanding of the this keyword and how it is used to resolve variable shadowing",
//   "Knowledge of Java packages and how they help organize large applications",
//   "Understanding method declaration, method rules and how methods are used to structure Java programs",
//   "Overall improvement in programming fundamentals, coding practices and understanding of modern software development concepts",
//   "Understanding object creation in Java and how instance variables are initialized",
//   "Understanding constructors in Java and how they are used to initialize objects",
//   "Knowledge of different types of constructors including default and parameterized",
//   "Ability to implement constructor overloading with multiple parameters",
//   "Understanding variable shadowing and local variables hiding instance variables",
//   "Clear understanding of the this keyword and how it resolves shadowing",
//   "Knowledge of Java packages and project structure organization",
//   "Understanding implicit and explicit packages and import mechanisms",
//   "Understanding method declaration, parameters, and return types in Java",
// ];

const MONTH_VALUE: Record<string, string> = {
  January: "0", February: "1", March: "2", April: "3",
  May: "4", June: "5", July: "6", August: "7",
  September: "8", October: "9", November: "10", December: "11",
};

// ──────────────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Click the "Internship Diary" link in the LEFT SIDEBAR.
 * After login the user is already on the dashboard — just click the sidebar link.
 * After Save the user is still within the dashboard app — just click the sidebar link again.
 * NO extra page.goto() calls — those crash the page!
 */
async function clickInternshipDiaryLink(page: Page): Promise<void> {
  const link = page.getByRole("link", { name: "Internship Diary", exact: true });
  await link.waitFor({ state: "visible", timeout: 15000 });
  await link.click();
  await page.waitForTimeout(2000);
  console.log("✓ Clicked Internship Diary sidebar link");
}

/** Select the internship from the combobox. Retries up to 3 times. */
async function selectInternship(page: Page): Promise<void> {
  const combobox = page.getByRole("combobox", { name: /Select Internship/i });
  await combobox.waitFor({ state: "visible", timeout: 15000 });

  let selected = false;
  for (let attempt = 1; attempt <= 3 && !selected; attempt++) {
    await combobox.click();
    await page.waitForTimeout(600);

    // Try exact match first
    const option = page.getByRole("option", { name: CONFIG.internshipRegex }).first();
    if (await option.count() > 0) {
      try {
        await option.click({ timeout: 3000 });
        selected = true;
      } catch {
        /* retry */
      }
    }

    // Fallback: click any first available option
    if (!selected) {
      const anyOption = page.locator('[role="option"]').first();
      if (await anyOption.count() > 0) {
        try {
          await anyOption.click({ timeout: 2000 });
          selected = true;
        } catch { /* retry */ }
      }
    }
    if (!selected) await page.waitForTimeout(400);
  }

  if (!selected) throw new Error("Could not select internship after 3 attempts");
  await page.waitForTimeout(400);
}

/** Open date picker → select month → click date. */
async function pickDate(page: Page, dateLabel: string): Promise<void> {
  const monthMatch = dateLabel.match(/,\s*([A-Za-z]+)\s+\d+/);
  const monthName = monthMatch ? monthMatch[1] : "March";
  const monthValue = MONTH_VALUE[monthName] ?? "2";

  await page.getByRole("button", { name: /Pick a Date/i }).waitFor({ state: "visible", timeout: 10000 });
  await page.getByRole("button", { name: /Pick a Date/i }).click();
  await page.waitForTimeout(400);

  await page.getByLabel("Choose the Month").selectOption(monthValue);
  await page.waitForTimeout(300);

  await page.getByRole("button", { name: dateLabel }).click();
  await page.waitForTimeout(300);
}

/** Fill description, hours, learnings. */
async function fillForm(page: Page, description: string, outcome: string): Promise<void> {
  await page.getByRole("textbox", { name: /Briefly describe the work/i }).fill(description);
  await page.getByPlaceholder("e.g.").fill(CONFIG.hoursPerDay);
  await page.getByRole("textbox", { name: /What did you learn or ship/i }).fill(outcome);
}

/**
 * Add all skills using the React-Select CHEVRON (▼) button.
 *
 * Root cause of previous failure: the React-Select input gets a new ID and
 * becomes disabled after each skill is selected (React re-renders the component).
 * Fix: click the .react-select__dropdown-indicator (chevron ▼) which is always
 * stable and gets a fresh reference each iteration of the loop.
 */
async function addSkills(page: Page, entryIndex: number): Promise<void> {
  for (const skill of CONFIG.skills) {
    // Fresh reference to chevron each time — React re-renders after each selection
    const chevron = page.locator('.react-select__dropdown-indicator').last();
    await chevron.waitFor({ state: 'visible', timeout: 5000 });
    await chevron.click();
    await page.waitForTimeout(500);

    // Wait for dropdown options to appear
    await page.locator('.react-select__option').first()
      .waitFor({ state: 'visible', timeout: 5000 })
      .catch(() => {});

    // Click the option that matches the skill name
    const option = page.locator('.react-select__option').filter({ hasText: skill }).first();
    if (await option.count() > 0) {
      await option.click();
      await page.waitForTimeout(350);
      console.log(`  ✓ [${entryIndex}] ${skill}`);
    } else {
      console.warn(`  ⚠ [${entryIndex}] Skill "${skill}" not found, skipping`);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);
    }
  }

  // Ensure dropdown is closed before proceeding to Save
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
}


/**
 * Scroll to Save button and click it.
 * The Save button is bottom-right — needs scroll into view.
 */
async function clickSave(page: Page, context: BrowserContext): Promise<void> {
  const saveBtn = page.getByRole("button", { name: "Save" });
  await saveBtn.waitFor({ state: "visible", timeout: 10000 });

  // Scroll it into full view
  await saveBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Watch for any popup tab
  const newPagePromise = context.waitForEvent("page", { timeout: 5000 }).catch(() => null);

  try {
    await saveBtn.click({ timeout: 3000 });
  } catch {
    console.log("  → Using force click for Save");
    await saveBtn.click({ force: true });
  }

  // Close any new tab the Save action opened
  const newTab = await newPagePromise;
  if (newTab && !newTab.isClosed()) {
    await newTab.waitForLoadState("domcontentloaded").catch(() => { });
    await newTab.close();
    console.log("  → Closed extra tab after Save");
  }

  await page.waitForTimeout(3000);
  console.log("  ✓ Saved");
}

// ──────────────────────────────────────────────────────────────────────────────
// MAIN TEST
// ──────────────────────────────────────────────────────────────────────────────
test("bulk create diary entries", async ({ page, context }) => {
  test.setTimeout(600000); // 10 minutes

  // Validate arrays match
  expect(dairyDescriptions.length).toBe(formattedDates.length);
  expect(outcomes.length).toBe(formattedDates.length);
  console.log(`📋 Creating ${formattedDates.length} diary entries`);

  // ── STEP 1: Go to sign-in page ──
  await page.goto(CONFIG.signInUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  // ── STEP 2: Fill login form and sign in ──
  await page.getByRole("textbox", { name: "Enter your email address" }).fill(CONFIG.email);
  await page.getByRole("textbox", { name: "Password" }).fill(CONFIG.password);
  await page.getByRole("button", { name: "Sign In" }).click();

  // Wait for redirect away from sign-in
  await page.waitForURL((url) => !url.toString().includes("sign-in"), { timeout: 20000 }).catch(() => { });
  await page.waitForTimeout(2000);
  console.log("✓ Logged in");

  // ── STEP 3: Dismiss "I Understand" modal if present ──
  try {
    const modal = page.getByRole("button", { name: "I Understand" });
    if (await modal.isVisible({ timeout: 3000 })) {
      await modal.click();
      await page.waitForTimeout(800);
      console.log("✓ Dismissed modal");
    }
  } catch {
    // no modal
  }

  // ── STEP 4: Click "Internship Diary" from the LEFT SIDEBAR ──
  await clickInternshipDiaryLink(page);

  // ── STEP 5: Create all 22 entries ──
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < formattedDates.length; i++) {
    const dateLabel = formattedDates[i];
    const description = dairyDescriptions[i];
    const outcome = outcomes[i];

    console.log(`\n── Entry ${i + 1}/${formattedDates.length}: ${dateLabel} ──`);

    try {
      // 5a. Select the internship from dropdown
      await selectInternship(page);
      console.log("  ✓ Internship selected");

      // 5b. Pick the date
      await pickDate(page, dateLabel);
      console.log("  ✓ Date selected");

      // 5c. Click Continue
      await page.getByRole("button", { name: "Continue" }).click();
      await page.waitForTimeout(1500);
      console.log("  ✓ Continued to form");

      // 5d. Fill description, hours, outcome
      await fillForm(page, description, outcome);
      console.log("  ✓ Form filled");

      // 5e. Add all 7 skills via React-Select
      await addSkills(page, i + 1);
      console.log("  ✓ Skills added");

      // 5f. Scroll to Save and click it
      await clickSave(page, context);
      successCount++;
      console.log(`✅ [${i + 1}/${formattedDates.length}] SAVED: ${dateLabel}`);

      // 5g. Click "Internship Diary" sidebar link again for next entry
      await clickInternshipDiaryLink(page);

    } catch (err) {
      failCount++;
      console.error(`❌ [${i + 1}/${formattedDates.length}] FAILED: ${dateLabel}`);
      console.error("  Error:", (err as Error).message);

      // Try to recover by clicking sidebar link
      try {
        if (page.isClosed()) {
          console.error("  ⛔ Page closed — stopping.");
          break;
        }
        await clickInternshipDiaryLink(page);
      } catch {
        console.error("  ⛔ Recovery failed — stopping.");
        break;
      }
    }
  }

  // Summary
  console.log(`\n${"═".repeat(50)}`);
  console.log(`📊 ${successCount} saved, ${failCount} failed out of ${formattedDates.length}`);
  console.log(`${"═".repeat(50)}`);
});
