/* eslint-disable no-undef */
/// <reference path="../pb_data/types.d.ts" />
// eslint-disable-next-line no-undef

cronAdd('createReports', '0 3 * * *', () => {
    try {
        const participants = $app.findRecordsByFilter(
            'Participant',
            'Paid = true',
            '', 0, 0
        )
        $app.expandRecords(participants, ['Category','School'])

        let json_data = []
        for (let item of participants) {
            json_data.push({"First Name": item.get('First_Name'), "Last Name": item.get('Last_Name'), School: item.expandedOne('School').get('Name'), Class: item.expandedOne('Category').get('Class'), Email: item.get('email'), "Phone Number": item.get('Phone_Number')})
        }

        const mainData = $app.findRecordById('Public_Relations', 'c4a3kyp8vrktfgb')
        mainData.set('Report', json_data)
        $app.saveRecord(mainData)

        json_data = []
        const busList = $app.findRecordsByFilter(
            'Participant',
            'Paid = true && Bus_Avail = true',
            '', 0, 0
        )
        $app.expandRecords(busList, ['School', 'Category'])
        for (let item of busList) {
            json_data.push({"First Name": item.get('First_Name'), "Last Name": item.get('Last_Name'), School: item.expandedOne('School').get('Name'), Class: item.expandedOne('Category').get('Class'), Email: item.get('email'), "Phone Number": item.get('Phone_Number')})
        }
        const busListData = $app.findRecordById('Public_Relations', 'c1exukcknnk7h34')
        busListData.set('Report', json_data)
        $app.saveRecord(busListData)

        let segmentRecord
        let segmentParticipants
        const soloSegmentList = $app.findRecordsByFilter('Solo_Segment', 'Name != ""', '', 0, 0).map((val) => val.get('Name'))
        for (let segment of soloSegmentList) {
            segmentRecord = $app.findFirstRecordByData('Public_Relations', 'Reference', segment)
            json_data = []
            segmentParticipants = $app.findRecordsByFilter(
                'Solo_Segment_Participant',
                `Segment.Name = "${segment}" && Participant.Paid = true`,
                '', 0, 0
            )
            $app.expandRecords(segmentParticipants, ['Participant'])
            segmentParticipants = segmentParticipants.map((val) => val.expandedOne('Participant'))
            $app.expandRecords(segmentParticipants, ['School', 'Category'])
            for (let item of segmentParticipants) {
                json_data.push({"First Name": item.get('First_Name'), "Last Name": item.get('Last_Name'), School: item.expandedOne('School').get('Name'), Class: item.expandedOne('Category').get('Class'), Email: item.get('email'), "Phone Number": item.get('Phone_Number')})
            }
            segmentRecord.set('Report', json_data)
            $app.saveRecord(segmentRecord)
        }
        const groupSegmentList =  $app.findRecordsByFilter('Group_Segment', 'Name != ""', '', 0, 0).map((val) => val.get('Name'))
        for (let segment of groupSegmentList) {
            segmentRecord = $app.findFirstRecordByData('Public_Relations', 'Reference', segment)
            json_data = []
            segmentParticipants = $app.findRecordsByFilter(
                'Group_Segment_Group',
                `Segment.Name = "${segment}" && Group.Admin.Paid = true`,
                '', 0, 0
            )
            $app.expandRecords(segmentParticipants, ['Group'])
            segmentParticipants = segmentParticipants.map((val) => val.expandedOne('Group'))
            $app.expandRecords(segmentParticipants, ['Members'])
            for (let group of segmentParticipants) {
                $app.expandRecords(group.expandedAll('Members'), ['Category', 'School'])
                for (let item of group.expandedAll('Members')) {
                    json_data.push({"Group Name": group.get('Name'), "First Name": item.get('First_Name'), "Last Name": item.get('Last_Name'), School: item.expandedOne('School').get('Name'), Class: item.expandedOne('Category').get('Class'), Email: item.get('email'), "Phone Number": item.get('Phone_Number'), Paid: item.get('Paid') ? '': 'Did not pay'})
                }
            }
            segmentRecord.set('Report', json_data)
            $app.saveRecord(segmentRecord)
               
        }

    } catch(error) {
        console.error(error)
    }
})