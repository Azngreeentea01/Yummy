window.YUMMY_DATA = {
  restaurants: [
    {
      id:'seoul-garden', name:'Seoul Garden Korean BBQ', cuisines:['Korean'], type:'BBQ', price:'$$', distance:1.2, open:true, closes:'10:00 PM',
      rating:4.7, reviews:1200, address:'123 Main Street, Anytown, CA 90210', delivery:'$2.99 delivery · 25–35 min', image:'assets/korean-bbq.svg', pin:[27,31],
      ratings:[['Google',4.7],['Yelp',4.5],['DoorDash',4.8]],
      popular:['Galbi','Bulgogi','Japchae'],
      menuSource:'Cached restaurant menu snapshot · demo data for local testing',
      menu:[
        {category:'Popular dishes',items:[['Galbi','$28.99','Marinated beef short ribs, grilled',['Popular']],['Bulgogi','$21.99','Thin-sliced marinated beef with vegetables',['Popular']]]},
        {category:'BBQ',items:[['Samgyeopsal','$22.99','Thick-cut pork belly for tabletop grilling',[]],['Spicy Pork Bulgogi','$20.99','Gochujang-marinated pork',['Spicy']]]},
        {category:'Noodles & rice',items:[['Japchae','$15.99','Sweet potato glass noodles with vegetables',[]],['Kimchi Fried Rice','$14.99','Kimchi, rice, egg, scallion',['Spicy']]]}
      ]
    },
    {
      id:'pho-saigon', name:'Pho Saigon', cuisines:['Vietnamese'], type:'Noodles', price:'$', distance:2.1, open:true, closes:'9:30 PM',
      rating:4.6, reviews:980, address:'456 Oak Avenue, Anytown, CA 90210', delivery:'$1.99 delivery · 20–30 min', image:'assets/pho.svg', pin:[59,44],
      ratings:[['Google',4.8],['Yelp',4.6],['Uber Eats',4.9]], popular:['Pho Dac Biet','Bun Bo Hue','Spring Rolls'],
      menuSource:'Cached restaurant menu snapshot · demo data for local testing',
      menu:[{category:'Popular dishes',items:[['Pho Dac Biet','$15.50','House special beef pho',['Popular']],['Bun Bo Hue','$15.95','Spicy lemongrass beef noodle soup',['Popular','Spicy']]]},{category:'Rice & noodles',items:[['Grilled Pork Vermicelli','$14.95','Rice noodles, herbs, pickled vegetables',[]],['Spicy Pho','$14.50','Beef pho with chili broth',['Spicy']]]}]
    },
    {
      id:'sushi-harbor', name:'Sushi Harbor', cuisines:['Japanese'], type:'Sushi', price:'$$', distance:2.7, open:true, closes:'11:00 PM',
      rating:4.8, reviews:1100, address:'789 Pine Road, Anytown, CA 90210', delivery:'$2.49 delivery · 30–40 min', image:'assets/sushi.svg', pin:[71,22],
      ratings:[['Google',4.8],['Yelp',4.7],['Grubhub',4.8]], popular:['Salmon Nigiri','Dragon Roll','Chirashi'],
      menuSource:'Cached restaurant menu snapshot · demo data for local testing',
      menu:[{category:'Chef favorites',items:[['Salmon Nigiri','$8.50','Atlantic salmon over seasoned rice',['Popular']],['Dragon Roll','$16.00','Eel, cucumber, avocado, sweet soy',['Popular']]]},{category:'Rolls',items:[['Spicy Tuna Roll','$9.50','Tuna, chili, cucumber',['Spicy']],['California Roll','$8.00','Crab mix, avocado, cucumber',[]]]}]
    },
    {
      id:'wok-and-flame', name:'Wok & Flame', cuisines:['Chinese'], type:'Sichuan', price:'$$', distance:3.3, open:true, closes:'10:30 PM',
      rating:4.5, reviews:875, address:'321 Maple Drive, Anytown, CA 90210', delivery:'$2.99 delivery · 25–35 min', image:'assets/chinese.svg', pin:[43,68],
      ratings:[['Google',4.5],['Yelp',4.4],['DoorDash',4.7]], popular:['Mapo Tofu','Dan Dan Noodles','Orange Chicken'],
      menuSource:'Cached restaurant menu snapshot · demo data for local testing',
      menu:[{category:'Sichuan favorites',items:[['Dan Dan Noodles','$13.95','Sesame, chili oil, minced pork',['Popular','Spicy']],['Mapo Tofu','$14.50','Silken tofu, beef, Sichuan pepper',['Spicy']]]},{category:'Entrees',items:[['Orange Chicken','$16.95','Crispy chicken, citrus glaze',[]],['Dry Fried Green Beans','$13.50','Garlic, preserved vegetable',[]]]}]
    },
    {
      id:'bangkok-basil', name:'Bangkok Basil', cuisines:['Thai'], type:'Thai', price:'$$', distance:4.0, open:true, closes:'9:45 PM',
      rating:4.7, reviews:640, address:'88 Cedar Street, Anytown, CA 90210', delivery:'$1.49 delivery · 25–40 min', image:'assets/thai.svg', pin:[80,61],
      ratings:[['Google',4.7],['Yelp',4.5],['Uber Eats',4.8]], popular:['Pad Thai','Green Curry','Tom Yum'],
      menuSource:'Cached restaurant menu snapshot · demo data for local testing',
      menu:[{category:'Popular dishes',items:[['Pad Thai','$14.95','Rice noodles, tamarind, peanut',['Popular']],['Green Curry','$16.50','Coconut curry, basil, vegetables',['Spicy']]]}]
    },
    {
      id:'manila-table', name:'Manila Table', cuisines:['Filipino'], type:'Filipino', price:'$$', distance:5.6, open:false, closes:'Opens tomorrow 11:00 AM',
      rating:4.6, reviews:420, address:'610 Market Lane, Anytown, CA 90210', delivery:'Pickup available', image:'assets/filipino.svg', pin:[34,55],
      ratings:[['Google',4.6],['Yelp',4.5]], popular:['Chicken Adobo','Sisig','Pancit'],
      menuSource:'Cached restaurant menu snapshot · demo data for local testing',
      menu:[{category:'House favorites',items:[['Chicken Adobo','$15.95','Soy-vinegar braised chicken',['Popular']],['Pork Sisig','$17.50','Crispy pork, calamansi, chili',['Popular']]]}]
    },
    {
      id:'masala-courtyard', name:'Masala Courtyard', cuisines:['Indian'], type:'Indian', price:'$$', distance:6.4, open:true, closes:'10:00 PM',
      rating:4.7, reviews:730, address:'240 Garden Boulevard, Anytown, CA 90210', delivery:'$2.49 delivery · 30–45 min', image:'assets/japanese-2.svg', pin:[65,63],
      ratings:[['Google',4.7],['Yelp',4.6]], popular:['Butter Chicken','Biryani','Garlic Naan'],
      menuSource:'Cached restaurant menu snapshot · demo data for local testing',
      menu:[{category:'Popular dishes',items:[['Butter Chicken','$17.95','Tomato cream curry, tandoori chicken',['Popular']],['Chicken Biryani','$16.95','Basmati rice, saffron, spices',['Popular']]]}]
    },
    {
      id:'kopitiam-88', name:'Kopitiam 88', cuisines:['Malaysian'], type:'Malaysian', price:'$', distance:8.3, open:true, closes:'8:30 PM',
      rating:4.5, reviews:355, address:'818 Harbor Way, Anytown, CA 90210', delivery:'$1.99 delivery · 35–50 min', image:'assets/malaysian.svg', pin:[22,72],
      ratings:[['Google',4.5],['Yelp',4.4]], popular:['Laksa','Nasi Lemak','Char Kway Teow'],
      menuSource:'Cached restaurant menu snapshot · demo data for local testing',
      menu:[{category:'Hawker favorites',items:[['Curry Laksa','$14.50','Coconut curry noodles, tofu, shrimp',['Popular','Spicy']],['Nasi Lemak','$13.95','Coconut rice, sambal, egg, anchovy',['Popular']]]}]
    }
  ]
};
