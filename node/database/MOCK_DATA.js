const demoData = [
  {
    productId: 1,
    title: "Raccoon Socks 1",
    description:
      "neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis",
    unitPrice: 11.43,
    imgIndex: 2,
  },
  {
    productId: 2,
    title: "Raccoon Socks 2",
    description:
      "rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas",
    unitPrice: 4.58,
    imgIndex: 12,
  },
  {
    productId: 3,
    title: "Raccoon Socks 3",
    description:
      "sagittis dui vel nisl duis ac nibh fusce lacus purus aliquet at",
    unitPrice: 4.29,
    imgIndex: 2,
  },
  {
    productId: 4,
    title: "Raccoon Socks 4",
    description:
      "turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis",
    unitPrice: 2.34,
    imgIndex: 9,
  },
  {
    productId: 5,
    title: "Raccoon Socks 5",
    description:
      "in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis",
    unitPrice: 33.87,
    imgIndex: 5,
  },
  {
    productId: 6,
    title: "Raccoon Socks 6",
    description:
      "tincidunt lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat eros viverra",
    unitPrice: 15.37,
    imgIndex: 9,
  },
  {
    productId: 7,
    title: "Raccoon Socks 7",
    description:
      "orci nullam molestie nibh in lectus pellentesque at nulla suspendisse potenti cras in purus eu magna vulputate luctus cum",
    unitPrice: 11.87,
    imgIndex: 14,
  },
  {
    productId: 8,
    title: "Raccoon Socks 8",
    description:
      "ut massa quis augue luctus tincidunt nulla mollis molestie lorem",
    unitPrice: 12.25,
    imgIndex: 13,
  },
  {
    productId: 9,
    title: "Raccoon Socks 9",
    description:
      "sit amet justo morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim",
    unitPrice: 32.44,
    imgIndex: 5,
  },
  {
    productId: 10,
    title: "Raccoon Socks 10",
    description:
      "vel est donec odio justo sollicitudin ut suscipit a feugiat et eros",
    unitPrice: 1.56,
    imgIndex: 12,
  },
  {
    productId: 11,
    title: "Raccoon Socks 11",
    description:
      "eget congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a",
    unitPrice: 19.54,
    imgIndex: 3,
  },
  {
    productId: 12,
    title: "Raccoon Socks 12",
    description:
      "pede posuere nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue",
    unitPrice: 24.81,
    imgIndex: 13,
  },
  {
    productId: 13,
    title: "Raccoon Socks 13",
    description:
      "dui maecenas tristique est et tempus semper est quam pharetra magna ac consequat metus sapien ut",
    unitPrice: 31.26,
    imgIndex: 12,
  },
  {
    productId: 14,
    title: "Raccoon Socks 14",
    description:
      "quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat",
    unitPrice: 3.36,
    imgIndex: 7,
  },
  {
    productId: 15,
    title: "Raccoon Socks 15",
    description:
      "et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio",
    unitPrice: 27.37,
    imgIndex: 11,
  },
  {
    productId: 16,
    title: "Raccoon Socks 16",
    description:
      "odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus",
    unitPrice: 3.2,
    imgIndex: 10,
  },
  {
    productId: 17,
    title: "Raccoon Socks 17",
    description:
      "tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla",
    unitPrice: 22.63,
    imgIndex: 11,
  },
  {
    productId: 18,
    title: "Raccoon Socks 18",
    description:
      "morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl",
    unitPrice: 17.95,
    imgIndex: 3,
  },
  {
    productId: 19,
    title: "Raccoon Socks 19",
    description:
      "tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo",
    unitPrice: 21.42,
    imgIndex: 4,
  },
  {
    productId: 20,
    title: "Raccoon Socks 20",
    description:
      "massa volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo",
    unitPrice: 19.64,
    imgIndex: 13,
  },
  {
    productId: 21,
    title: "Raccoon Socks 21",
    description:
      "quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices libero",
    unitPrice: 29.5,
    imgIndex: 8,
  },
  {
    productId: 22,
    title: "Raccoon Socks 22",
    description: "sapien a libero nam dui proin leo odio porttitor id",
    unitPrice: 13.77,
    imgIndex: 7,
  },
  {
    productId: 23,
    title: "Raccoon Socks 23",
    description:
      "ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla",
    unitPrice: 17.54,
    imgIndex: 11,
  },
  {
    productId: 24,
    title: "Raccoon Socks 24",
    description:
      "in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id",
    unitPrice: 34.87,
    imgIndex: 8,
  },
  {
    productId: 25,
    title: "Raccoon Socks 25",
    description:
      "ut dolor morbi vel lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet",
    unitPrice: 11.44,
    imgIndex: 14,
  },
  {
    productId: 26,
    title: "Raccoon Socks 26",
    description:
      "et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo",
    unitPrice: 26.98,
    imgIndex: 4,
  },
  {
    productId: 27,
    title: "Raccoon Socks 27",
    description:
      "praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus",
    unitPrice: 9.45,
    imgIndex: 2,
  },
  {
    productId: 28,
    title: "Raccoon Socks 28",
    description:
      "cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim",
    unitPrice: 8.39,
    imgIndex: 10,
  },
  {
    productId: 29,
    title: "Raccoon Socks 29",
    description:
      "et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat",
    unitPrice: 2.29,
    imgIndex: 14,
  },
  {
    productId: 30,
    title: "Raccoon Socks 30",
    description:
      "suspendisse potenti cras in purus eu magna vulputate luctus cum sociis",
    unitPrice: 26.65,
    imgIndex: 13,
  },
  {
    productId: 31,
    title: "Raccoon Socks 31",
    description:
      "quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum",
    unitPrice: 33.39,
    imgIndex: 8,
  },
  {
    productId: 32,
    title: "Raccoon Socks 32",
    description:
      "sit amet erat nulla tempus vivamus in felis eu sapien cursus vestibulum proin eu mi nulla ac enim in tempor",
    unitPrice: 20.38,
    imgIndex: 3,
  },
  {
    productId: 33,
    title: "Raccoon Socks 33",
    description:
      "eu massa donec dapibus duis at velit eu est congue elementum in hac habitasse platea dictumst morbi vestibulum velit",
    unitPrice: 6.25,
    imgIndex: 14,
  },
  {
    productId: 34,
    title: "Raccoon Socks 34",
    description:
      "maecenas pulvinar lobortis est phasellus sit amet erat nulla tempus vivamus in felis",
    unitPrice: 34.69,
    imgIndex: 10,
  },
  {
    productId: 35,
    title: "Raccoon Socks 35",
    description: "mi in porttitor pede justo eu massa donec dapibus duis at",
    unitPrice: 25.66,
    imgIndex: 1,
  },
  {
    productId: 36,
    title: "Raccoon Socks 36",
    description:
      "congue elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum",
    unitPrice: 11.92,
    imgIndex: 12,
  },
  {
    productId: 37,
    title: "Raccoon Socks 37",
    description:
      "viverra eget congue eget semper rutrum nulla nunc purus phasellus in",
    unitPrice: 5.13,
    imgIndex: 3,
  },
  {
    productId: 38,
    title: "Raccoon Socks 38",
    description:
      "id ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu sed",
    unitPrice: 16.59,
    imgIndex: 11,
  },
  {
    productId: 39,
    title: "Raccoon Socks 39",
    description:
      "vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis",
    unitPrice: 13.44,
    imgIndex: 3,
  },
  {
    productId: 40,
    title: "Raccoon Socks 40",
    description:
      "morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante",
    unitPrice: 25.16,
    imgIndex: 11,
  },
  {
    productId: 41,
    title: "Raccoon Socks 41",
    description:
      "aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut",
    unitPrice: 4.11,
    imgIndex: 2,
  },
  {
    productId: 42,
    title: "Raccoon Socks 42",
    description:
      "ut volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam",
    unitPrice: 26.81,
    imgIndex: 5,
  },
  {
    productId: 43,
    title: "Raccoon Socks 43",
    description:
      "ut at dolor quis odio consequat varius integer ac leo pellentesque ultrices mattis odio donec vitae nisi nam ultrices",
    unitPrice: 7.1,
    imgIndex: 14,
  },
  {
    productId: 44,
    title: "Raccoon Socks 44",
    description:
      "quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet",
    unitPrice: 10.92,
    imgIndex: 13,
  },
  {
    productId: 45,
    title: "Raccoon Socks 45",
    description:
      "praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem",
    unitPrice: 3.03,
    imgIndex: 9,
  },
  {
    productId: 46,
    title: "Raccoon Socks 46",
    description: "quisque arcu libero rutrum ac lobortis vel dapibus at diam",
    unitPrice: 13.4,
    imgIndex: 3,
  },
  {
    productId: 47,
    title: "Raccoon Socks 47",
    description:
      "lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus",
    unitPrice: 4.75,
    imgIndex: 7,
  },
  {
    productId: 48,
    title: "Raccoon Socks 48",
    description:
      "in sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at",
    unitPrice: 13.04,
    imgIndex: 7,
  },
  {
    productId: 49,
    title: "Raccoon Socks 49",
    description:
      "bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus",
    unitPrice: 18.33,
    imgIndex: 9,
  },
  {
    productId: 50,
    title: "Raccoon Socks 50",
    description:
      "nam ultrices libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla",
    unitPrice: 24.15,
    imgIndex: 8,
  },
  {
    productId: 51,
    title: "Raccoon Socks 51",
    description:
      "purus phasellus in felis donec semper sapien a libero nam dui proin leo",
    unitPrice: 4.08,
    imgIndex: 2,
  },
  {
    productId: 52,
    title: "Raccoon Socks 52",
    description:
      "congue eget semper rutrum nulla nunc purus phasellus in felis donec semper sapien a libero nam dui proin leo",
    unitPrice: 20.73,
    imgIndex: 4,
  },
  {
    productId: 53,
    title: "Raccoon Socks 53",
    description: "sagittis dui vel nisl duis ac nibh fusce lacus purus",
    unitPrice: 13.7,
    imgIndex: 14,
  },
  {
    productId: 54,
    title: "Raccoon Socks 54",
    description:
      "id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum",
    unitPrice: 2.67,
    imgIndex: 1,
  },
  {
    productId: 55,
    title: "Raccoon Socks 55",
    description:
      "malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin",
    unitPrice: 10.18,
    imgIndex: 1,
  },
  {
    productId: 56,
    title: "Raccoon Socks 56",
    description:
      "justo etiam pretium iaculis justo in hac habitasse platea dictumst etiam",
    unitPrice: 31.89,
    imgIndex: 14,
  },
  {
    productId: 57,
    title: "Raccoon Socks 57",
    description:
      "duis bibendum felis sed interdum venenatis turpis enim blandit mi in porttitor pede justo eu massa donec dapibus duis at",
    unitPrice: 15.07,
    imgIndex: 4,
  },
  {
    productId: 58,
    title: "Raccoon Socks 58",
    description:
      "orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis",
    unitPrice: 27.98,
    imgIndex: 4,
  },
  {
    productId: 59,
    title: "Raccoon Socks 59",
    description:
      "felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar",
    unitPrice: 25.8,
    imgIndex: 10,
  },
  {
    productId: 60,
    title: "Raccoon Socks 60",
    description:
      "donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque",
    unitPrice: 17.39,
    imgIndex: 1,
  },
  {
    productId: 61,
    title: "Raccoon Socks 61",
    description:
      "sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl",
    unitPrice: 29.79,
    imgIndex: 14,
  },
  {
    productId: 62,
    title: "Raccoon Socks 62",
    description:
      "quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin",
    unitPrice: 23.62,
    imgIndex: 13,
  },
  {
    productId: 63,
    title: "Raccoon Socks 63",
    description:
      "sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia erat",
    unitPrice: 3.74,
    imgIndex: 1,
  },
  {
    productId: 64,
    title: "Raccoon Socks 64",
    description:
      "lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh",
    unitPrice: 23.89,
    imgIndex: 12,
  },
  {
    productId: 65,
    title: "Raccoon Socks 65",
    description:
      "donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci",
    unitPrice: 18.17,
    imgIndex: 1,
  },
  {
    productId: 66,
    title: "Raccoon Socks 66",
    description:
      "luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum ante ipsum",
    unitPrice: 7.07,
    imgIndex: 11,
  },
  {
    productId: 67,
    title: "Raccoon Socks 67",
    description:
      "augue a suscipit nulla elit ac nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit",
    unitPrice: 21.99,
    imgIndex: 9,
  },
  {
    productId: 68,
    title: "Raccoon Socks 68",
    description:
      "consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum",
    unitPrice: 18.89,
    imgIndex: 3,
  },
  {
    productId: 69,
    title: "Raccoon Socks 69",
    description:
      "est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl duis bibendum felis sed",
    unitPrice: 30.64,
    imgIndex: 13,
  },
  {
    productId: 70,
    title: "Raccoon Socks 70",
    description:
      "suspendisse potenti cras in purus eu magna vulputate luctus cum sociis",
    unitPrice: 24.87,
    imgIndex: 11,
  },
];

export default demoData;
