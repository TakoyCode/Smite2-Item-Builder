from bs4 import BeautifulSoup
import requests
# This is for finding where the security certificate is located
# print(requests.certs.where())

url = "https://webcms.hirezstudios.com/smite2/api/posts/?filters[slug][$eq]=alpha-weekend-1-playtest-notes&lng=en-US&populate=*null"

headers = {"User-Agent": "Mozilla/5.0 (X11; CrOS x86_64 12871.102.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"}

# makes it so the http request can't conenct via ipv6
requests.packages.urllib3.util.connection.HAS_IPV6 = False
page = requests.get(url, headers=headers)
# verify=False - use this if i ever have to disable the security certificate check in the http request

itemsDivIndex = page.text.find("<div>Items</div>")
DefaultItemsStrongIndex = page.text.find("<strong>Default Items every god starts with every game</strong>")
IssuesDivIndex = page.text.find("<div>Issues and Roadmap</div>")

slicedPage = page.text[(DefaultItemsStrongIndex - 3):(IssuesDivIndex - 38)]

soup = BeautifulSoup(slicedPage, features="html.parser")
# print(soup.prettify())

unordered_lists = soup.find_all("ul", recursive=False)

category = [categories.find_all("li", recursive=False) for categories in unordered_lists]

def FormatItemProp(prop):
    if(": " in prop):
        return prop.split(": ", 1)
    
    if("g" in prop[-1:]):
        goldProp = ["Gold"] + [prop[:-1]]
        return goldProp
        
    splitProps = prop.split()
    if(len(splitProps) >= 3):
        splitProps = (["".join(splitProps[ :-1])] + splitProps[-1:])

    if("%" in splitProps[1][-1:]):
        splitProps = [splitProps[0], splitProps[1][:-1]]

    return splitProps

def GetItems():
    index = -1
    for items in category:
        if(index >= -1): 
            for item in items:
                itemProps = item.contents[1].find_all("li")
                itemPropsText = [prop.text for prop in itemProps]

                ItemWithFormatedProps = [["Name", item.contents[0]], ["Tier", index]]
                for prop in itemPropsText:
                    itemProp = FormatItemProp(prop)
                    ItemWithFormatedProps.append(itemProp)
                print(ItemWithFormatedProps)
        index += 1
GetItems()

class a() : pass
obj = a()
obj.a = 3
setattr(obj, "Name", 2)
# print(vars(obj))


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

