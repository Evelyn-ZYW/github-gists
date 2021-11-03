# Instructions:

Using the API below, which will fetch Github gists, display each user’s avatar (owner.avatar_url) and file name (files.xxx) in a list.
The list needs to be high performance, well structured, and easy to maintain.

## Each line item:
- Profile image from array[n].owner.avatar_url
- File Name from array[n].files.xxx

## API: https://api.github.com/gists/public

### Page query options:
- since=YYYY-MM-DDTHH:MM:SSZ
- per_page=30
- page=2

API Doc: https://developer.github.com/v3/gists/#list-all-public-gists

## Requirement:
- Paged data using infinite scroll
- Scrolling the list should be smooth
- Layout should be reasonably responsive
- Preferred to be written in Typescript, but Javascript is fine as well
- Please limit the use of external libraries. If you find one necessary, please provide your reason for using it.

### Bonus:
When click on the row, the selected profile image will fade in the center of the screen and fade out in 1 second.