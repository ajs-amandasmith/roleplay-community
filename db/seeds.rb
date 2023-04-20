# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "🌱 Seeding data..."

User.destroy_all
Character.destroy_all
Post.destroy_all
Comment.destroy_all
Tag.destroy_all
PostTag.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('characters')
ActiveRecord::Base.connection.reset_pk_sequence!('posts')
ActiveRecord::Base.connection.reset_pk_sequence!('comments')
ActiveRecord::Base.connection.reset_pk_sequence!('tags')
ActiveRecord::Base.connection.reset_pk_sequence!('post_tags')

User.create(username: "Bob", about_me: "Hello, my name's Bob and I like to write things.", password_digest: "Bob123")
User.create(username: "Writes4U", about_me: "Creating things really is the best thing in the world!", password_digest: "Writes4U")
User.create(username: "I'M LOUD", about_me: "WRITING MAKES ME HAPPY", password_digest: "ALLCAPS")
User.create(username: "Pacifist3000", about_me: "I don't like violence", password_digest: "Death2All")

Character.create(user_id: 1, name: "Rufus", about: "As a bard, Rufus has the ability to sing, play instruments, and recite poetry or stories. He's also skilled in persuasion, diplomacy, and has a good knowledge of various cultures and histories. Additionally, he has some proficiency in magic and can cast spells to help him in his travels.").avatar.attach(io: File.open(Rails.root.join('db/images/Rufus.png')), filename: "Rufus.png", content_type: "png")
Character.create(user_id: 2, name: "Georgie", about: "A barbarian. 'Grunts'").avatar.attach(io: File.open(Rails.root.join('db/images/Georgie.jpeg')), filename: "Georgie.jpeg", content_type: "jpeg")
Character.create(user_id: 1, name: "Harry Potter", about: "The boy wizard").avatar.attach(io: File.open(Rails.root.join('db/images/Harry.jpeg')), filename: "Harry.jpeg", content_type: "jpeg")
Character.create(user_id: 4, name: "Voldemort", about: "The Dark Lord").avatar.attach(io: File.open(Rails.root.join('db/images/Voldy.jpeg')), filename: "Voldy.jpeg", content_type: "jpeg")

Post.create!(title: "Welcome to the Bluebell Tavern!", post: "Rufus is singing in a crowded tavern, with people cheering and clapping as he sings his latest composition. The tavern is dimly lit, and the air is thick with the scent of tobacco and alcohol. Rufus's performance seems to be a hit with the patrons, and they're all in good spirits.", user_id: 1, character_id: 1).image.attach(io: File.open(Rails.root.join('db/images/Tavern.jpeg')), filename: "Tavern.jpeg", content_type: "jpeg")
Post.create(title: "...Back at Hogwarts", post: "Harry always felt safest at Hogwarts. Too bad it never lasted long...", user_id: 1, character_id: 3).image.attach(io: File.open(Rails.root.join('db/images/Hogwarts.jpeg')), filename: "Hogwarts.jpeg", content_type: "jpeg")

Comment.create(comment: "As Rufus finishes his song, the crowd erupts into applause. He takes a bow and thanks the audience for their support. As he steps off the stage, he notices a group of travelers sitting at a nearby table, looking tired and dusty from their journey through the desert.", user_id: 1, post_id: 1, character_id: 1)
Comment.create(comment: "Rufus decides to approach them, hoping to offer some entertainment and perhaps even earn some coin. 'Greetings, travelers!' he says cheerfully. 'Would you care for some music and storytelling to lift your spirits?'", user_id: 1, post_id: 1, character_id: 1)
Comment.create(comment: "Georgie looks up as the bard approaches. 'Aye, I'd like that a lot. Please tell us a riveting tale.'", user_id: 2, post_id: 1, character_id: 2)
Comment.create(comment: "Rufus nods at Georgie with a smile, happy to have caught the attention of the weary travelers. 'Of course, I'd be happy to oblige,' he says, taking a seat at their table. He clears his throat and begins his tale.", user_id: 1, post_id: 1, character_id: 1)
Comment.create(comment: "'Once upon a time, in the heart of the desert, there was a great kingdom ruled by a wise and just king. The kingdom was prosperous, and the people were happy. However, one day, a great dragon appeared and began to terrorize the kingdom. The king was worried, and he knew he had to do something to protect his people.'", user_id: 1, post_id: 1, character_id: 1)
Comment.create(comment: "Rufus pauses for effect, taking a sip of water before continuing. 'So, the king called upon a brave knight, who had a reputation for being fearless and skilled with a sword. The knight accepted the king's request and set out to find the dragon, armed with only his sword and his courage.'", user_id: 1, post_id: 1, character_id: 1)
Comment.create(comment: "'The journey was long and treacherous, but eventually, the knight arrived at the dragon's lair. He confronted the dragon, and a fierce battle ensued. But in the end, the knight emerged victorious, having slain the dragon and saved the kingdom from its terror.'", user_id: 1, post_id: 1, character_id: 1)
Comment.create(comment: "Rufus finishes his tale with a flourish, and the travelers applaud, impressed with his storytelling abilities.", user_id: 1, post_id: 1, character_id: 1)
Comment.create(comment: "'That was a great story,' says Georgie. 'You're quite talented, Rufus.'", user_id: 2, post_id: 1, character_id: 2)
Comment.create(comment: "'Potter! Get back here!' Voldemort shouted as the 'Boy Who Lived' ran through the halls, suits of armor towering over them throughout the pursuit.", user_id: 4, post_id: 2, character_id: 4)
Comment.create(comment: "'Never, Snake Face!' Harry kept running, hoping he knew the castle better than Lord What's-it, as it had been a looooooong time since the geezer had last been in the castle.", user_id: 1, post_id: 2, character_id: 3)

Tag.create(tag: "starter-post")
Tag.create(tag: "welcome-post")
Tag.create(tag: "follow-up-post")
Tag.create(tag: "final-post")

PostTag.create(post_id: 1, tag_id: 1)
PostTag.create(post_id: 2, tag_id: 1)
PostTag.create(post_id: 2, tag_id: 4)

puts "✅ Done seeding!"