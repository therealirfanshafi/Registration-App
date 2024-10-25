/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />
// eslint-disable-next-line no-undef

cronAdd('createReports', '0 3 * * *', () => {
    try {
        const participants = $app.dao().findRecordsByFilter(
            'Participant',
            'Paid = true',
            '', 0, 0
        )
        $app.dao().expandRecords(participants, ['Category','School'])

        let json_data = []
        for (let item of participants) {
            json_data.push({"First Name": item.get('First_Name'), "Last Name": item.get('Last_Name'), School: item.expandedOne('School').get('Name'), Class: item.expandedOne('Category').get('Class'), Email: item.get('email'), "Phone Number": item.get('Phone_Number')})
        }

        const mainData = $app.dao().findRecordById('Public_Relations', 'c4a3kyp8vrktfgb')
        mainData.set('Report', json_data)
        $app.dao().saveRecord(mainData)

        json_data = []
        const busList = $app.dao().findRecordsByFilter(
            'Participant',
            'Paid = true && Bus_Avail = true',
            '', 0, 0
        )
        $app.dao().expandRecords(busList, ['School', 'Category'])
        for (let item of busList) {
            json_data.push({"First Name": item.get('First_Name'), "Last Name": item.get('Last_Name'), School: item.expandedOne('School').get('Name'), Class: item.expandedOne('Category').get('Class'), Email: item.get('email'), "Phone Number": item.get('Phone_Number')})
        }
        const busListData = $app.dao().findRecordById('Public_Relations', 'c1exukcknnk7h34')
        busListData.set('Report', json_data)
        $app.dao().saveRecord(busListData)

        let segmentRecord
        let segmentParticipants
        const soloSegmentList = $app.dao().findRecordsByFilter('Solo_Segment', 'Name != ""', '', 0, 0).map((val) => val.get('Name'))
        for (let segment of soloSegmentList) {
            segmentRecord = $app.dao().findFirstRecordByData('Public_Relations', 'Reference', segment)
            json_data = []
            segmentParticipants = $app.dao().findRecordsByFilter(
                'Solo_Segment_Participant',
                `Segment.Name = "${segment}" && Participant.Paid = true`,
                '', 0, 0
            )
            $app.dao().expandRecords(segmentParticipants, ['Participant'])
            segmentParticipants = segmentParticipants.map((val) => val.expandedOne('Participant'))
            $app.dao().expandRecords(segmentParticipants, ['School', 'Category'])
            for (let item of segmentParticipants) {
                json_data.push({"First Name": item.get('First_Name'), "Last Name": item.get('Last_Name'), School: item.expandedOne('School').get('Name'), Class: item.expandedOne('Category').get('Class'), Email: item.get('email'), "Phone Number": item.get('Phone_Number')})
            }
            segmentRecord.set('Report', json_data)
            $app.dao().saveRecord(segmentRecord)
        }
        const groupSegmentList =  $app.dao().findRecordsByFilter('Group_Segment', 'Name != ""', '', 0, 0).map((val) => val.get('Name'))
        for (let segment of groupSegmentList) {
            segmentRecord = $app.dao().findFirstRecordByData('Public_Relations', 'Reference', segment)
            json_data = []
            segmentParticipants = $app.dao().findRecordsByFilter(
                'Group_Segment_Group',
                `Segment.Name = "${segment}" && Group.Admin.Paid = true`,
                '', 0, 0
            )
            $app.dao().expandRecords(segmentParticipants, ['Group'])
            segmentParticipants = segmentParticipants.map((val) => val.expandedOne('Group'))
            $app.dao().expandRecords(segmentParticipants, ['Members'])
            console.log(JSON.stringify(segmentParticipants))
            for (let group of segmentParticipants) {
                $app.dao().expandRecords(group.expandedAll('Members'), ['Category', 'School'])
                for (let item of group.expandedAll('Members')) {
                    json_data.push({"Group Name": group.get('Name'), "First Name": item.get('First_Name'), "Last Name": item.get('Last_Name'), School: item.expandedOne('School').get('Name'), Class: item.expandedOne('Category').get('Class'), Email: item.get('email'), "Phone Number": item.get('Phone_Number'), Paid: item.get('Paid') ? '': 'Did not pay'})
                }
            }
            segmentRecord.set('Report', json_data)
            $app.dao().saveRecord(segmentRecord)
               


        }



    } catch(error) {
        console.error(error)
    }
})