# -=- WORK IN PROGRESS -=-
### _Project #1_


## Description
Create a simple "to-do list" application, using client-side HTML, CSS, and Javascript only.

## Requirements
#### The Application:
1. **should** store its data using  **localStorage** only;
2. **should not** connect to any external APIs, backends, databases etc;
3. **should** function as a SPA: the page should never _actually_ refresh or reload, and no links should direct to any other page; instead, when links are clicked/forms are submitted, the contents of the page should disappear and the new content should be loaded in its place, all without actually redirecting the user.

#### User stories
##### _Index_

1. **onRefresh**|**onLoad** USER should see 
a. the `title` of the application,
b. a `description`,
c. and two `buttons`: `Sign Up` and `Log In`.

2. If `Sign Up` is clicked:
a. USER is given a FORM (`first name`, `last name`, `email`, `password`, `cbox_terms_of_use` ("I agree to the Terms of Use".)  All fields are mandatory.
b. **onSubmit** FORM: **onError**: error message somewhere on the screen, _red color_.
c. **onSubmi**t FORM: if form OK: USER is given DASHBOARD.

3. If `Log In` is clicked:
a. USER is given the login FORM (enter `email address` and `password`.)
b. **onSubmit** FORM: **onError** (wrong email and/or password):  error message somewhere on the screen, _red color_.
c. **onSubmit** FORM: if inputs are fine, USER is given DASHBOARD.

##### _Dashboard_

1. should list in chronological order, all of the `TODO-List`s created by the USER thus far. 
2. If none have been created, none should be displayed.
3. In either case, there should be a `Create New to-do List` button somewhere on the screen.
4. If a user clicks to create a new todo list, they should be taken to a blank list.
5. If one of the existing todo-lists is clicked on, the user should be taken to that list.

##### _Lists_

When a user is viewing a (new or existing) list, they should be able to :
1. Name or rename the list to anything as long as is unique (to that user)
2.  Add as many items to the list as they wish.
3. Check off an item as "done", and uncheck it as well
4. Save the list

##### _Users_

1. onUserLoggedin: at the top of the screen, on every page of the site, there should be a "log out" button
2. Clicking "log out" button should log the user out.
3. onUserLoggedin: at the top of the screen, on every page of the site, there should be an "account settings" button .
4. Clicking "account settings" button should take the user to a page where they can edit any/all of the information they entered on the signup form.
5. The application should support as many unique users as possible. 
6. The actions that one user takes within the application should have virtually no effect on what other users are doing.

## Extra Credit:

Try to find an open-source JS library for hashing passwords. Hash the passwords when you receive them and only store the hash rather than the raw password.
