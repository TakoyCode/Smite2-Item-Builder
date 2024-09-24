from bs4 import BeautifulSoup
import requests
# print(requests.certs.where())

url = "https://webcms.hirezstudios.com/smite2/api/posts/?filters[slug][$eq]=alpha-weekend-1-playtest-notes&lng=en-US&populate=*null"

headers = {"User-Agent": "Mozilla/5.0 (X11; CrOS x86_64 12871.102.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"}

requests.packages.urllib3.util.connection.HAS_IPV6 = False
page = requests.get(url, headers=headers)
# , verify=False
# print(page.text)

itemsDivIndex = page.text.find("<div>Items</div>")
DefaultItemsStrongIndex = page.text.find("<strong>Default Items every god starts with every game</strong>")
IssuesDivIndex = page.text.find("<div>Issues and Roadmap</div>")

slicedPage = page.text[(DefaultItemsStrongIndex - 3):(IssuesDivIndex - 38)]

soup = BeautifulSoup(slicedPage, features="html.parser")
# print(soup.prettify())

unordered_lists = soup.find_all("ul", recursive=False)
# print(ul_category[2])

# li_items = ul_category[3].find_all("li", recursive=False)
category = [categories.find_all("li", recursive=False) for categories in unordered_lists]
# print(category_items)

class a() : pass
obj = a()
obj.a = 3
setattr(obj, "Name", 2)
# print(vars(obj))


def GetItems():
    index = -1
    itemProps = []
    for items in category:
        if(index >= 1): 
            for item in items:
                item_name = [item.contents[0]]
                item_props = item.contents[1].find_all("li")
                # final_props1 = [item.contents[0], f"Tier: {index}"] + [prop.text for prop in item_props]
                final_props2 = [prop.text for prop in item_props]

                # Dra ut som metode+
                if(":" in final_props2[1]):
                    test = final_props2[1].split(": ", 1)
                    print(test)
                    continue
                test = final_props2[1].split()
                if(len(test) >= 3):
                   test = ["".join(test[ :-1])] + test[-1:]

                print(test)
                # print((final_props2[1]).split())
                
                # final_props2[1]
        index += 1
    # return itemProps 
GetItems()

# print(itemObj)
# itemObj = {
#             "Name" : item.contents[0],
#             "Tier" : index,
#             "Gold" : (item_props[0].text)[:-1],
#             # for k, v in final_props:
#             # return 
#         }

# class finished_item:
#     Name = item_title
#     Properties = item_props
# print(finished_item.Name, finished_item.Properties)

# class Item(object):
#     pass

# itemObj = Item()
# itemObj.Name = item.contents[0]
# itemObj.Tier = index
# itemObj.Gold = (item_props[0].text)[:-1]
# print(itemObj)

